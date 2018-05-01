class RoadSerializer < ActiveModel::Serializer
  attributes :id, :name, :nodes, :cross_streets, :geojson
end
