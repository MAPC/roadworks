namespace :import do
  desc "Import permits from seamless docs"
  task permits: :environment do
    ImportPermitsWorker.perform_async('CO18041000056728845', :street_opening)
    ImportPermitsWorker.perform_async('CO18041000056724482', :trench)
  end
end
