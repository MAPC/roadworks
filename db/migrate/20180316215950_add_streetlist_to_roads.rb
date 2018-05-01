class AddStreetlistToRoads < ActiveRecord::Migration[5.1]
  def change
    add_column :roads, :streetlist, :decimal
  end
end
