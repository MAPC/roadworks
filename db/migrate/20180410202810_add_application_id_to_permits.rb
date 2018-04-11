class AddApplicationIdToPermits < ActiveRecord::Migration[5.1]
  def change
    add_column :permits, :application_id, :string
  end
end
