# == Schema Information
#
# Table name: plans
#
#  id         :integer          not null, primary key
#  name       :string
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  city       :string
#  published  :boolean
#

class Plan < ApplicationRecord
  @@valid_plan_types = ['PAVING', 'MORATORIUM']
  has_many :timeframes
  validates :name, presence: true, length: { minimum: 1 }
  validates :type, presence: true, inclusion: { in: @@valid_plan_types }
  validates :city, presence: true, length: { minimum: 1 }
end
