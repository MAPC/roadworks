json.extract! permit, :id, :type, :applicant_first_name, :applicant_last_name, :start_date, :end_date, :address, :payload, :created_at, :updated_at
json.url permit_url(permit, format: :json)
