require 'faraday'
require 'openssl'
require 'digest'
require 'date'
require 'json'
require 'pry-byebug'

class ImportPermitsWorker
  include Sidekiq::Worker

  def perform(form_id, permit_type)
    permits = form_pipeline(form_id: form_id)
    permits['items'].each do |permit|
      Permit.find_or_create_by(application_id: permit['application_id']) do |new_permit|
        new_permit.kind = permit_type
        new_permit.applicant_first_name = permit['application_data']['Applicant Name'].match('(\w+)<br>')[1]
        new_permit.applicant_last_name = permit['application_data']['Applicant Name'].match('(\w+)<br>(\w+)')[2]
        new_permit.start_date = permit['application_data']['Estimated Start Date']
        new_permit.end_date = permit['application_data']['Estimated Completion Date']
        new_permit.address = permit['application_data']['Location of Construction']
        new_permit.payload = permit
      end
    end
  end

  def form_pipeline(form_id:)
    timestamp = DateTime.now.strftime('%s').to_s
    signature = OpenSSL::HMAC.hexdigest('sha256', Rails.application.secrets.seamless_api_secret, "GET+/form/#{form_id}/pipeline+#{timestamp}")
    conn = Faraday.new(url: 'https://mapc.seamlessdocs.com', ssl: {verify: false})

    response = conn.get do |req|
      req.url "/api/form/#{form_id}/pipeline"
      req.headers['Date'] = timestamp
      req.headers['Authorization'] = "api_key=#{Rails.application.secrets.seamless_api_key} signature=#{signature}"
    end

    submissions = JSON.parse(response.body)

    submissions['columns'].each do |column|
      submissions['items'].each do |permit|
        permit['application_data'][column[1]['printable_name']] = permit['application_data'].delete(column[0])
      end
    end

    return submissions
  end
end
