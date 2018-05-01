Rails.application.routes.draw do
  devise_for :users, path_prefix: 'api', path: 'auth', controllers: { sessions: 'sessions' }, path_names: { sign_in: 'login', sign_out: 'logout' }

  namespace :api do
    resources :cities, only: [:show]
    resources :roads, only: [:index, :show]
    resources :nodes, only: [:index]
    resources :plans, only: [:index, :create, :show, :update, :destroy]
    resources :permits, only: [:index, :show]
    resources :users, only: [:index, :create, :update]
  end

  # Let React Router take care of everything not API related
  get '*path', to: 'application#index'
end
