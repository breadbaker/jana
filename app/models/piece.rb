class Piece < ActiveRecord::Base

  attr_accessible :image, :title, :caption, :date_finished

	has_attached_file :image, styles: {
		big: '600x600>',
		small: '150x150#'
	}


	def as_json( piece )
	{
    id: self.id,
	 	title: self.title,
    date_finished: self.date_finished.to_s,
		caption: self.caption,
		bigUrl: self.image.url(:big),
		smallUrl: self.image.url(:small)
	}
	end

end
