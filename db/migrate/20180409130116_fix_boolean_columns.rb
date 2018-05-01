class FixBooleanColumns < ActiveRecord::Migration[5.1]
  def change
    change_column :plans, :plan_type, :string, null: false
    rename_column :segments, :is_whole_road, :is_segment
    change_column :segments, :is_segment, :boolean, null: false, default: false
    change_column :segments, :is_orig_type_address, :boolean, null: false, default: false
    change_column :segments, :is_dest_type_address, :boolean, null: false, default: false
  end
end
