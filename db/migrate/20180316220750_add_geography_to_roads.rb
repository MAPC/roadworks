class AddGeographyToRoads < ActiveRecord::Migration[5.1]
  def change
    add_column :roads, :mgis_town, :string
    add_column :roads, :city, :int
  end
end
