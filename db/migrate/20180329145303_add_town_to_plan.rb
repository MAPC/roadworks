class AddTownToPlan < ActiveRecord::Migration[5.1]
  def change
    add_column :plans, :city, :string
  end
end
