class UsersController < ApplicationController
	skip_before_filter :current_user, only: [:create]

	def new
	end

	def create
 		begin
      @user = User.new(params[:user])
      login(@user)
      @user.save
      render json: {user: @user}, status: 200
    rescue StandardError => e
			puts e.message
      head :bad_request
    end
	end

end
