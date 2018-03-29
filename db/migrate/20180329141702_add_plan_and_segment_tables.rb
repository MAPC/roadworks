class AddPlanAndSegmentTables < ActiveRecord::Migration[5.1]
  def change
    create_table :plans do |t|
      t.string :name
      t.string :type
      t.timestamps
    end
    create_table :timeframes do |t|
      t.belongs_to :plan, index: true
      t.date :start
      t.date :end
      t.timestamps
    end
    create_table :segments do |t|
      t.belongs_to :timeframe, index: true
      t.belongs_to :road, index: true
      t.boolean :is_whole_road
      t.boolean :is_orig_type_address
      t.integer :orig
      t.boolean :is_dest_type_address
      t.integer :dest
      t.integer :nodes, array: true, default: []
      t.json :custom_nodes
      t.timestamps
    end
  end
end
