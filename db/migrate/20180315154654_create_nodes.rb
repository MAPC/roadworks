class CreateNodes < ActiveRecord::Migration[5.1]
  def change
    create_table :nodes do |t|
      t.st_point :geometry
      t.text :neighbors, array: true, default: []
      t.text :part_of, array: true, default: []

      t.timestamps
    end
  end
end
