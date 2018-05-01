class SegmentSerializer < ActiveModel::Serializer
  attributes :id, :timeframe_id, :road_id, :is_segment,
      :is_orig_type_address, :orig, :is_dest_type_address, :dest, :nodes,
      :custom_nodes
  belongs_to :timeframe
end
