class PermitSerializer < ActiveModel::Serializer
  attributes :id, :city_name, :permit_type, :applicant_name, :start_date, :end_date, :address, :application_data, :geojson
end
