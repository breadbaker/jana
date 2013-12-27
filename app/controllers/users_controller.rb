class UsersController < ApplicationController
	skip_before_filter :current_user, only: [:create]

	def new
	end

  def create
    auth = request.env['omniauth.auth']

    user = User.find_by_uid(auth[:uid])

    unless user
     user = User.create!(
       uid: auth[:uid],
       first_name: auth[:info][:first_name],
       last_name: auth[:info][:last_name],
       email: auth[:info][:email],
       image: auth[:info][:image]
     )
    end

    login(user)

    session[:user_id] = user.id

    redirect_to root_url
  end

  # def create
  #      begin
  #       @user = User.new(params[:user])
  #       login(@user)
  #       @user.save
  #       render json: {user: @user}, status: 200
  #     rescue StandardError => e
  #     puts e.message
  #       head :bad_request
  #     end
  # end


end
