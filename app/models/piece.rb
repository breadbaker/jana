class Piece < ActiveRecord::Base

  attr_accessible :image, :title

	has_attached_file :image, styles: {
		big: '600x600>',
		small: '50x50#'
	}


	def as_json
	{
	 	title: self.title,
		caption: self.caption,
		bigUrl: self.image.url(:big),
		smallUrl: self.image.url(:small)
	}
	end

end
