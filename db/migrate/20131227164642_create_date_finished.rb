class CreateDateFinished < ActiveRecord::Migration
  def change
    add_column :pieces, :date_finished, :date
  end
end
