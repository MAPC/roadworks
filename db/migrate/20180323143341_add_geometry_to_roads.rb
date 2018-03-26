class AddGeometryToRoads < ActiveRecord::Migration[5.1]
  def change
    add_column :roads, :geometry, :multi_line_string, srid: 4326
  end
end
