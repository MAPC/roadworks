class AddApplicationDataToPermits < ActiveRecord::Migration[5.1]
  def change
    add_column :permits, :application_data, :jsonb
  end
end
