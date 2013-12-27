Jana::Application.routes.draw do

	root to: 'root#index'

  get "auth/facebook/callback" => "users#create"

	resource :sessions
	resources :users

	resources :pieces
end
