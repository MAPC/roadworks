require 'faraday'
require 'openssl'
require 'digest'
require 'date'
require 'json'
require 'pry-byebug'

class ImportPermitsWorker
  include Sidekiq::Worker

  def perform(form_id, city_name, permit_type)
    permits = form_pipeline(form_id: form_id)
    permits['items'].each do |permit|
      Permit.find_or_create_by(application_id: permit['application_id']) do |new_permit|
        new_permit.permit_type = permit_type
        new_permit.city_name = city_name
        new_permit.applicant_name = permit['application_data']['Applicant Name']
        new_permit.end_date = permit['application_data']['Estimated Completion Date']
        if permit['application_data']['Location of Construction']
          new_permit.address = permit['application_data']['Location of Construction'].gsub(/<br>/, ",") # Should be Location of Work
        elsif permit['application_data']['Location of Work']
          new_permit.address = permit['application_data']['Location of Work'].gsub(/<br>/, ",") # Should be Location of Work
        end
        new_permit.payload = permit
      end
    end
  end

  def form_pipeline(form_id:)
    timestamp = DateTime.now.strftime('%s').to_s
    signature = OpenSSL::HMAC.hexdigest('sha256', Rails.application.secrets.seamless_api_secret, "GET+/form/#{form_id}/pipeline+#{timestamp}")
    conn = Faraday.new(url: 'https://mapc.seamlessdocs.com', ssl: { verify: false })

    response = conn.get do |req|
      req.url "/api/form/#{form_id}/pipeline"
      req.headers['Date'] = timestamp
      req.headers['Authorization'] = "api_key=#{Rails.application.secrets.seamless_api_key} signature=#{signature}"
    end

    submissions = JSON.parse(response.body)
    puts submissions
    submissions['columns'].each do |column|
      col_details = column[1]
      submissions['items'].each do |permit|
        permit['application_data'][col_details['printable_name']] =
            permit['application_data'][col_details['printable_name']] ||
            permit['application_data'][col_details['column_id']]
      end
    end

    return submissions
  end
end
