# == Schema Information
#
# Table name: municipal_boundaries
#
#  gid               :integer          not null, primary key
#  objectid          :decimal(10, )
#  town              :string(21)
#  town_id           :decimal(10, )
#  pop1980           :decimal(10, )
#  pop1990           :decimal(10, )
#  pop2000           :decimal(10, )
#  popch80_90        :decimal(10, )
#  popch90_00        :decimal(10, )
#  municipality_type :string(2)
#  fourcolor         :decimal(10, )
#  fips_stco         :decimal(10, )
#  sum_acres         :decimal(, )
#  sum_square        :decimal(, )
#  pop2010           :decimal(10, )
#  popch00_10        :decimal(10, )
#  st_area_sh        :decimal(, )
#  st_length_        :decimal(, )
#  geom              :geometry({:srid= multipolygon, 4326
#

class MunicipalBoundary < ApplicationRecord
end
