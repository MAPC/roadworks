class AddGeometryToPermits < ActiveRecord::Migration[5.1]
  def change
    add_column :permits, :geometry, :point, srid: 4326
  end
end
