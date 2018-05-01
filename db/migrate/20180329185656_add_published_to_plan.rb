class AddPublishedToPlan < ActiveRecord::Migration[5.1]
  def change
    add_column :plans, :published, :boolean
  end
end
