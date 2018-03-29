class Segment < ApplicationRecord
  belongs_to :timeframe
  validates :timeframe, presence: true
end
