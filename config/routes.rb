Rails.application.routes.draw do
  get '/:city' => 'city#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # resources :road
  scope '/api' do
    scope '/road' do
      get '/' => 'road#index'
      scope '/:id' do
        get '/' => 'road#show'
      end
    end
    scope '/node' do
      get '/' => 'node#index'
      scope '/:id' do
        get '/' => 'node#show'
      end
    end
  end
end
