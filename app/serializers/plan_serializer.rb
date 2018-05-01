class PlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :plan_type, :city, :published, :color, :timeframes, :user_id
  has_many :timeframes
  belongs_to :user
end
