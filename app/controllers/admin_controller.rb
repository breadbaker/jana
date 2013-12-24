class AdminController < ApplicationController

	befor_filter :is_admin?


	def index
	end


end
