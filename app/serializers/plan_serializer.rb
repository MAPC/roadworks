class PlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :city, :published, :timeframes
  def timeframes
    return self.object.timeframes.map do |timeframe|
      TimeframeSerializer.new(timeframe)
    end
  end
end
