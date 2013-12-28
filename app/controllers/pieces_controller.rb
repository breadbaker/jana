class PiecesController < ApplicationController
	skip_before_filter :current_user, only: [:index,:show]

	def index
		pieces = Piece.all

		render json: pieces
	end

  def create
    # begin
      piece = Piece.create(params[:piece])
      render json: piece
    # rescue StandardError => e
 #      puts e.message
 #      render json: { message: e.message}, status: 400
 #    end
  end

  def update
    begin
      piece = Piece.find(params[:id])
      if params[:piece][:image].length < 400
        params[:piece].except!(:image)
      else
        piece.image.destroy
      end
      piece.update_attributes(params[:piece])
      render json: piece
    rescue StandardError => e
      render json: {message: e.message}, status: 400
    end
  end

  def destroy
    begin
      piece = Piece.find(params[:id])
      piece.destroy
      render json: piece
    rescue StandardError => e
      render json: {message: e.message}, status: 400
    end
  end


end
