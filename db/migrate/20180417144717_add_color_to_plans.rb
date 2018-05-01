class AddColorToPlans < ActiveRecord::Migration[5.1]
  def change
    add_column :plans, :color, :string, null: false, default: '#F44336'
  end
end
