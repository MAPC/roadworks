class Timeframe < ApplicationRecord
  belongs_to :plan
  has_many :segments
  validates :start, presence: true
  validates :end, presence: true
  validates :plan, presence: true
end
