module SessionsHelper

  def login(user)
    user.reset_token!
    cookies[:token] = { :value => user.token, :expires => 9.hour.from_now }
  end

  def logout
    current_user.reset_token!
  end

	def is_admin?
		current_user.email == 'fake@fake.com'
	end

  def current_user
    @current_user ||= User.find_by_token(cookies[:token])
    unless @current_user
      head :bad_request
    end

    @current_user
  end

end
