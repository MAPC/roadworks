class CombineApplicantNameOnPermits < ActiveRecord::Migration[5.1]
  def change
    remove_column :permits, :applicant_first_name, :string
    remove_column :permits, :applicant_last_name, :string
    add_column :permits, :applicant_name, :string
  end
end
