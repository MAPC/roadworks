class CreatePermits < ActiveRecord::Migration[5.1]
  def change
    create_table :permits do |t|
      t.integer :type
      t.string :applicant_first_name
      t.string :applicant_last_name
      t.date :start_date
      t.date :end_date
      t.string :address
      t.jsonb :payload

      t.timestamps
    end
  end
end
