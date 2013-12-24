class CreatePieces < ActiveRecord::Migration
  def change
    create_table :pieces do |t|
      t.has_attached_file :image
      t.string :title

      t.timestamps
    end
  end
end
