class StreetlistToInt < ActiveRecord::Migration[5.1]
  def change
    remove_column :roads, :streetlist, :decimal
    add_column :roads, :streetlist, :int
  end
end
