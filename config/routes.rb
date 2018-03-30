Rails.application.routes.draw do
  scope '/api' do
    scope '/city' do
      get '/:name' => 'city#show'
    end
    scope '/road' do
      get '/' => 'road#index'
      get '/:id' => 'road#show'
    end
    scope '/node' do
      get '/' => 'node#index'
      get '/:id' => 'node#show'
    end
    scope '/plan' do
      get '/' => 'plan#index'
      post '/' => 'plan#create'
      get '/:id' => 'plan#show'
    end
  end
  # Let React Router take care of everything not API related
  get '*path', to: 'application#index'
end
