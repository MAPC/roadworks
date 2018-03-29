# == Schema Information
#
# Table name: segments
#
#  id                   :integer          not null, primary key
#  timeframe_id         :integer
#  road_id              :integer
#  is_whole_road        :boolean
#  is_orig_type_address :boolean
#  orig                 :integer
#  is_dest_type_address :boolean
#  dest                 :integer
#  nodes                :integer          default([]), is an Array
#  custom_nodes         :json
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class Segment < ApplicationRecord
  belongs_to :timeframe
  belongs_to :road
  validates :timeframe_id, presence: true
end
