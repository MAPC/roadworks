class CitySerializer < ActiveModel::Serializer
  attributes :id, :name, :city_code, :geojson, :mask, :centroid, :bounds
end
