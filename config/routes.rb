Rails.application.routes.draw do
  namespace :api do
    devise_for :users

    resources :cities, only: [:show]
    resources :roads, only: [:index, :show]
    resources :nodes, only: [:index]
    resources :plans, only: [:index, :create, :show]
    resources :permits, only: [:index, :show]
  end

  # Let React Router take care of everything not API related
  get '*path', to: 'application#index'
end
