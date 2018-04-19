class FixPermitGeometry < ActiveRecord::Migration[5.1]
  def change
    remove_column :permits, :geometry, :point
    add_column :permits, :geometry, :st_point, srid: 4326
  end
end
