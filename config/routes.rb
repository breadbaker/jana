Jana::Application.routes.draw do
	
	root to: 'root#index'

	resources :sessions
	resources :users

	resources :pieces
end
