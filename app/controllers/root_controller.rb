class RootController < ApplicationController
	skip_before_filter :current_user

	def index
	end
end
