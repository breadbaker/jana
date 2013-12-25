class AddCaptionPieces < ActiveRecord::Migration
  def change
		add_column :pieces, :caption, :string
  end
end
