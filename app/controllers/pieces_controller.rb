class PiecesController < ApplicationController
	
	def index
		pieces = Piece.all

		render json: pieces
	end
end
