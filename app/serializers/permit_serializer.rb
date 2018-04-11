class PermitSerializer < ActiveModel::Serializer
  attributes :id, :type, :applicant_first_name, :applicant_last_name, :start_date, :end_date, :address, :payload
end
