namespace :import do
  desc "Import permits from seamless docs"
  task permits: :environment do
    ImportPermitsWorker.perform_async('CO18041000056728845', 'WESTBOROUGH', 'STREET_OPENING')
    ImportPermitsWorker.perform_async('CO18041000056724482', 'WESTBOROUGH', 'TRENCH')
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
