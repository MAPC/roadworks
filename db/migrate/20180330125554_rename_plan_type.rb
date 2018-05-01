class RenamePlanType < ActiveRecord::Migration[5.1]
  def change
    remove_column :plans, :type, :string
    add_column :plans, :plan_type, :string
  end
end
