class RenameTypeToKind < ActiveRecord::Migration[5.1]
  def change
    rename_column :permits, :type, :kind
  end
end
