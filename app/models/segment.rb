# == Schema Information
#
# Table name: segments
#
#  id                   :integer          not null, primary key
#  timeframe_id         :integer
#  road_id              :integer
#  is_segment           :boolean          default(FALSE), not null
#  is_orig_type_address :boolean          default(FALSE), not null
#  orig                 :integer
#  is_dest_type_address :boolean          default(FALSE), not null
#  dest                 :integer
#  nodes                :integer          default([]), is an Array
#  custom_nodes         :json
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class Segment < ApplicationRecord
  belongs_to :timeframe, inverse_of: :segments, optional: true
  belongs_to :road
end
