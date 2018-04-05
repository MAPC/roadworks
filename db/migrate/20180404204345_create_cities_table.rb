class CreateCitiesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :cities do |t|
      t.string :name
      t.integer :city_code
      t.multi_polygon :geometry, srid: 4326
      t.timestamps
    end
    rename_column :roads, :mgis_town, :city_name
    rename_column :roads, :city, :city_code
  end
end
