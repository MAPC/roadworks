class PlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :plan_type, :city, :published, :color, :timeframes
  has_many :timeframes
end
