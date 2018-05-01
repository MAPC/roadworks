class TimeframeSerializer < ActiveModel::Serializer
  attributes :id, :plan_id, :start, :end, :segments
  has_many :segments
  belongs_to :plan
end
