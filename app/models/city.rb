# == Schema Information
#
# Table name: cities
#
#  id         :integer          not null, primary key
#  name       :string
#  city_code  :integer
#  geometry   :geometry({:srid= multipolygon, 4326
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class City < ApplicationRecord
end
