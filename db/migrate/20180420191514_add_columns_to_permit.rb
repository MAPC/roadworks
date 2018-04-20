class AddColumnsToPermit < ActiveRecord::Migration[5.1]
  def change
    add_column :permits, :columns, :jsonb
  end
end
