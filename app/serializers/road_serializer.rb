class RoadSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :nodes, :cross_streets

end
