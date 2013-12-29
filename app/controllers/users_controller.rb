class UsersController < ApplicationController
	skip_before_filter :current_user, only: [:create,:confirm, :recover]


  def update
    current_user.update_attributes(params[:user])
    redirect_to root_url
  end

  def create
    begin
      user = User.create(params[:user])
      msg = UserMailer.confirmation_email(user)

      msg.deliver!
      msg = UserMailer.tell_dan(user)
      msg.deliver!
      render json: {message: "We have sent you a confirmation Email!"}, status: 200
    rescue StandardError => e
      puts e.message
      render json: {message: e.message}, status: 400
    end
  end

  def confirm
    user = User.find_by_confirm_token(params[:confirm])
    user.confirmed = true
    login(user)
    redirect_to root_url
  end

  def recover
    user = User.find_by_confirm_token(params[:confirm])
    user.set_confirm_token
    user.save!
    login(user)
  end

  def update_password
    begin
      current_user.change_pass!(params[:user])
      current_user.save!
      flash[:message] = "Password Updated!"
      redirect_to root_url
    rescue StandardError => e
      flash[:message] = e.message
      render 'recover'
    end
  end

end
