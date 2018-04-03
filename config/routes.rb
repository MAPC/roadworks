Rails.application.routes.draw do
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

  # Let React Router take care of everything not API related
  get '*path', to: 'city#index'
end
