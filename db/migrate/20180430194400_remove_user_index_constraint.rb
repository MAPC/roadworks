class RemoveUserIndexConstraint < ActiveRecord::Migration[5.1]
  def change
    change_column_default :users, :email, from: "", to: nil
    add_index :users, :token, unique: true
  end
end
