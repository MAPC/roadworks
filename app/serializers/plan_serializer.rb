class PlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :plan_type, :city, :published, :timeframes
  has_many :timeframes
end
