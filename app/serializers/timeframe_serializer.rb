class TimeframeSerializer < ActiveModel::Serializer
  attributes :id, :plan_id, :start, :end
end