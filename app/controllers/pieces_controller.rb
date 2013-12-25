class PiecesController < ApplicationController
	skip_before_filter :current_user, only: [:index,:show]
	
	def index
		pieces = Piece.all

		render json: pieces
	end
end
