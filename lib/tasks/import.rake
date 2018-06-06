namespace :import do
  desc "Import permits from seamless docs"
  task permits: :environment do
    ImportPermitsWorker.perform_async('CO18051000061434306', 'AYER', 'ROAD_OPENING')
    ImportPermitsWorker.perform_async('CO18061000062674608', 'NORTH READING', 'ROAD_OPENING')
    ImportPermitsWorker.perform_async('CO18061000062671881', 'WESTBOROUGH', 'ROAD_OPENING')
    ImportPermitsWorker.perform_async('CO18061000062720012', 'AYER', 'TRENCH')
    ImportPermitsWorker.perform_async('CO18061000062763393', 'NORTH READING', 'TRENCH')
    ImportPermitsWorker.perform_async('CO18061000062765563', 'WESTBOROUGH', 'TRENCH')
    ImportPermitsWorker.perform_async('CO18061000062863842', 'MILTON', 'GENERAL')
    ImportPermitsWorker.perform_async('CO18061000062877675', 'MILTON', 'DRIVEWAY_ENTRANCE')
    unless Rails.env.production?
      # Test pipeline
      ImportPermitsWorker.perform_async('CO18061000062979697', 'MILTON', 'GENERAL')
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
