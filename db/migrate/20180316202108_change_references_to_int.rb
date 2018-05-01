class ChangeReferencesToInt < ActiveRecord::Migration[5.1]
  def change
    remove_column :nodes, :part_of, :text
    remove_column :nodes, :neighbors, :text
    remove_column :roads, :nodes, :text
    add_column :nodes, :part_of, :int, array: true, default: []
    add_column :nodes, :neighbors, :int, array: true, default: []
    add_column :roads, :nodes, :int, array: true, default: []
  end
end
