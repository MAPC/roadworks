class FixPublishedColumn < ActiveRecord::Migration[5.1]
  def change
    change_column :plans, :published, :boolean, null: false, default: false
  end
end
