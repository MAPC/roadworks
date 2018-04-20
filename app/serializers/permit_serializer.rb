class PermitSerializer < ActiveModel::Serializer
  attributes :id, :permit_type, :applicant_name, :start_date, :end_date, :address, :application_data, :geojson, :city_name
end
