class RawSegment < ApplicationRecord
  self.primary_key = "gid"
  alias_attribute :street_name, :street_nam
  alias_attribute :geometry, :geom
end
