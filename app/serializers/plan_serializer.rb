class PlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :city, :published
end
