class AddTokensToUsers < ActiveRecord::Migration[5.1]
  def change
    change_column :users, :email, :string, null: true
    change_column :users, :encrypted_password, :string, null: true
    add_column :users, :token, :string
    add_column :users, :name, :string
    add_column :users, :created_by, :integer, index: true
    add_column :users, :city_name, :string
  end
end
