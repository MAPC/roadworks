# == Schema Information
#
# Table name: roads
#
#  id            :integer          not null, primary key
#  name          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  nodes         :integer          default([]), is an Array
#  city_name     :string
#  city_code     :integer
#  streetlist    :integer
#  cross_streets :integer          default([]), is an Array
#  geometry      :geometry({:srid= multilinestring, 4326
#

class Road < ApplicationRecord
end
