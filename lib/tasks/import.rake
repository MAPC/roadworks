namespace :import do
  desc "Import permits from seamless docs"
  task permits: :environment do
    ImportPermitsWorker.perform_async('CO18041000056728845', :street_opening)
    ImportPermitsWorker.perform_async('CO18041000056724482', :trench)
  end

  desc "Import fake users"
  task fake_users: :environment do
    User.create([
      { email: 'utility@seed.org', password: 'password', role: :utility },
      { email: 'city@seed.org',    password: 'password', role: :city },
    ])
  end
end
