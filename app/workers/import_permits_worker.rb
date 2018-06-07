require 'faraday'
require 'openssl'
require 'digest'
require 'date'
require 'json'

class ImportPermitsWorker
  include Sidekiq::Worker

  @@batch_size = 2

  def perform(form_id, city_name, permit_type)
    permits, columns = form_pipeline(form_id: form_id)
    permits.each do |permit|
      Permit.find_or_create_by(application_id: permit['application_id']) do |new_permit|
        new_permit.permit_type = permit_type
        new_permit.city_name = city_name
        if permit['mapped_application_data']['Applicant Name']
          new_permit.applicant_name = permit['mapped_application_data']['Applicant Name']
        end
        if permit['mapped_application_data']['Estimated Start Date']
          new_permit.start_date = permit['mapped_application_data']['Estimated Start Date']
        end
        if permit['mapped_application_data']['Estimated End Date']
          new_permit.end_date = permit['mapped_application_data']['Estimated End Date']
        end
        if permit['mapped_application_data']['Location of Work']
          new_permit.address = permit['mapped_application_data']['Location of Work'].gsub(/<br>/, ",").gsub(/\|/, ",").gsub(/,,/, ",")
        end
        new_permit.payload = permit
        new_permit.columns = columns
        new_permit.application_data = permit['mapped_application_data']
      end
    end
  end

  def form_pipeline(form_id:)
    timestamp = DateTime.now.strftime('%s').to_s
    pipeline_signature = OpenSSL::HMAC.hexdigest('sha256', Rails.application.secrets.seamless_api_secret, "GET+/form/#{form_id}/pipeline+#{timestamp}")
    conn = Faraday.new(url: 'https://mapc.seamlessdocs.com', ssl: { verify: false })
    offset = 0
    fetched = 0
    permits = []
    columns = nil
    loop do
      response = conn.get do |req|
        req.url "/api/form/#{form_id}/pipeline"
        req.headers['Date'] = timestamp
        req.headers['Authorization'] = "api_key=#{Rails.application.secrets.seamless_api_key} signature=#{pipeline_signature}"
        req.params['limit'] = @@batch_size
        req.params['offset'] = offset
      end

      body = JSON.parse(response.body)
      unless columns
        columns = body['columns']
      end
      body['items'].each do |permit|
        permit['mapped_application_data'] = Hash.new
        body['columns'].each do |column|
          col_details = column[1]
          permit['mapped_application_data'][col_details['printable_name']] =
              permit['mapped_application_data'][col_details['printable_name']] ||
              permit['application_data'][col_details['column_id']]
        end
        unless Permit.find_by(application_id: permit['application_id'])
          status_signature = OpenSSL::HMAC.hexdigest('sha256', Rails.application.secrets.seamless_api_secret, "GET+/application/#{permit['application_id']}/status+#{timestamp}")
          response = conn.get do |req|
            req.url "/api/application/#{permit['application_id']}/status"
            req.headers['Date'] = timestamp
            req.headers['Authorization'] = "api_key=#{Rails.application.secrets.seamless_api_key} signature=#{status_signature}"
          end
          status = JSON.parse(response.body)
          if !status['error'] && status['total_signers'] == status['signatures']
            permits.push(permit)
          end
        end
      end
      items_count = body['items_count']
      fetched += body['items'].length
      offset += @@batch_size
      break if fetched >= items_count
    end
    return permits, columns
  end
end
