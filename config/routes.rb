Jana::Application.routes.draw do
	
	root to: 'root#index'

	resource :sessions
	resources :users

	resources :pieces
end
