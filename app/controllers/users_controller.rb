class UsersController < ApplicationController
	skip_before_filter :current_user, only: [:create,:confirm]



  def create
    #begin
      user = User.create(params[:user])
      msg = UserMailer.confirmation_email(user)
      msg.deliver!
      render json: {message: "We have sent you a confirmation Email!"}, status: 200
      #rescue StandardError => e
      #puts e.message
      #render json: {message: e.message}, status: 400
      #end
  end

  def confirm
    user = User.find_by_confirm_token(params[:confirm])
    user.confirmed = true
    login(user)
    redirect_to root_url
  end


end
