# == Schema Information
#
# Table name: nodes
#
#  id         :integer          not null, primary key
#  geometry   :geometry({:srid= point, 0
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  part_of    :integer          default([]), is an Array
#  neighbors  :integer          default([]), is an Array
#

class Node < ApplicationRecord
end
