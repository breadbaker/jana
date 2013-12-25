class ApplicationController < ActionController::Base
  protect_from_forgery
	include SessionsHelper

	before_filter :current_user

	def is_admin?
		current_user.email == 'admin@fake.com'
	end

end
