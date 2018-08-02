namespace :import do
  desc "Import permits from seamless docs"
  task permits: :environment do
    mapc_seamless = {
      api_key: Rails.application.secrets.seamless_api_key,
      api_secret: Rails.application.secrets.seamless_api_secret,
    }
    ayer_seamless = {
      api_key: Rails.application.secrets.ayer_seamless_api_key,
      api_secret: Rails.application.secrets.ayer_seamless_api_secret,
    }
    ImportPermitsWorker.perform_async(ayer_seamless, 'CO18071000067958015', 'AYER', 'ROAD_OPENING')
    ImportPermitsWorker.perform_async(mapc_seamless, 'CO18061000062674608', 'NORTH READING', 'ROAD_OPENING')
    ImportPermitsWorker.perform_async(mapc_seamless, 'CO18061000062671881', 'WESTBOROUGH', 'ROAD_OPENING')
    ImportPermitsWorker.perform_async(ayer_seamless, 'CO18071000067958078', 'AYER', 'TRENCH')
    ImportPermitsWorker.perform_async(mapc_seamless, 'CO18061000062763393', 'NORTH READING', 'TRENCH')
    ImportPermitsWorker.perform_async(mapc_seamless, 'CO18061000062765563', 'WESTBOROUGH', 'TRENCH')
    ImportPermitsWorker.perform_async(mapc_seamless, 'CO18061000062863842', 'MILTON', 'GENERAL')
    ImportPermitsWorker.perform_async(mapc_seamless, 'CO18061000062877675', 'MILTON', 'DRIVEWAY_ENTRANCE')
    unless Rails.env.production?
      # Test pipeline
      ImportPermitsWorker.perform_async(mapc_seamless, 'CO18061000062979697', 'MILTON', 'GENERAL')
    end
  end

  desc "Import fake users"
  task fake_users: :environment do
    User.create([
      {
        email: 'city@seed.org',
        password: 'password',
        role: :city,
        name: 'City',
        city_name: 'WESTBOROUGH',
      },
    ])
  end
end
