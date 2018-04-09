# == Schema Information
#
# Table name: plans
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  city       :string
#  published  :boolean          default(FALSE), not null
#  plan_type  :string           not null
#

class Plan < ApplicationRecord
  @@valid_plan_types = ['PAVING', 'MORATORIUM']
  has_many :timeframes, inverse_of: :plan
  validates :name, presence: true, length: { minimum: 1 }
  validates :type, presence: true, inclusion: { in: @@valid_plan_types }
  validates :city, presence: true, length: { minimum: 1 }
  validates :published, presence: true
  alias_attribute :type, :plan_type
  accepts_nested_attributes_for :timeframes

end
