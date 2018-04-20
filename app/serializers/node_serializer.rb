class NodeSerializer < ActiveModel::Serializer
  attributes :id, :geojson, :part_of, :neighbors
end
