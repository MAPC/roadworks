class RoadSerializer < ActiveModel::Serializer
  attributes :id, :name, :nodes, :city_name, :cross_streets, :geojson
end
