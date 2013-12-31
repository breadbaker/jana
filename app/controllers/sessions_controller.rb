class SessionsController < ApplicationController
	skip_before_filter :current_user, only: [:create, :forgot, :fbcreate]

	def create
    begin
      user = User.find_by_token(cookies[:token])
      user = User.find_by_credentials!(params[:user]) unless user
      raise 'Must Confirm Email' unless user.confirmed
      login(user)
			data = {
				user: user
			}
      render json: data, status: 200
    rescue StandardError => e
      logger.info e.message
      render json: { message: e.message }, status: 400
    end
  end


  def fbcreate
    auth = request.env['omniauth.auth']

    user = User.find_by_uid(auth[:uid])

    unless user
      data = {
        uid: auth[:uid],
        first_name: auth[:info][:first_name],
        last_name: auth[:info][:last_name],
        email: auth[:info][:email],
        image: auth[:info][:image]
      }

      user = User.find_by_email(auth[:info][:email])

      if user
        user.update_attributes(data)
      else
        user = User.create!(data)
      end
    end

    login(user)

    redirect_to root_url
  end

  def forgot
    user = User.find_by_email(params[:user][:email])
    if user
      user.set_confirm_token

      user.save!
      msg = UserMailer.recover_email(user)
      msg.deliver!
      render json: { message: "We have sent you an email with instuctions."}, status: 200
    else
      render json: { message: 'Invalid Email'}, status: 400
    end
  end


  def destroy
    begin
      logout
    rescue
    end
    head :ok
  end

end
