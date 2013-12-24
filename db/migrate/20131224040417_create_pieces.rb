class CreatePieces < ActiveRecord::Migration
  def change
    create_table :pieces do |t|
      t.attachement :image
      t.string :title

      t.timestamps
    end
  end
end
