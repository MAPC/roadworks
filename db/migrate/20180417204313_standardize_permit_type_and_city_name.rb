class StandardizePermitTypeAndCityName < ActiveRecord::Migration[5.1]
  def change
    remove_column :permits, :kind, :integer
    add_column :permits, :permit_type, :string
    add_column :permits, :city_name, :string
  end
end
