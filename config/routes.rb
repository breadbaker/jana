Jana::Application.routes.draw do

	root to: 'root#index'

  get "auth/facebook/callback" => "sessions#fbcreate"

  post 'forgot' => 'sessions#forgot'
	resource :sessions
	resources :users do
    member do
      get 'confirm'
      get 'recover'
      post 'update_password'
    end
  end

	resources :pieces
end
