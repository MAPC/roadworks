Rails.application.routes.draw do
  namespace :api do
    resources :city, only: [:show]
    resources :road, only: [:index, :show]
    resources :node, only: [:index, :show]
    resources :plan, only: [:index, :create, :show]
  end
  # Let React Router take care of everything not API related
  get '*path', to: 'application#index'
end
