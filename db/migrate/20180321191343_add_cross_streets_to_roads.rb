class AddCrossStreetsToRoads < ActiveRecord::Migration[5.1]
  def change
    add_column :roads, :cross_streets, :int, array: true, default: []
  end
end
