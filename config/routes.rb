Jana::Application.routes.draw do

	root to: 'root#index'

  get "auth/facebook/callback" => "sessions#fbcreate"

	resource :sessions
	resources :users do
    member do
      get 'confirm'
    end
  end

	resources :pieces
end
