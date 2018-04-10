Rails.application.routes.draw do
  resources :permits
  namespace :api do
    resources :cities, only: [:show]
    resources :roads, only: [:index, :show]
    resources :nodes, only: [:index, :show]
    resources :plans, only: [:index, :create, :show]
  end
  # Let React Router take care of everything not API related
  get '*path', to: 'application#index'
end
