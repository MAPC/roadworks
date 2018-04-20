namespace :import do
  desc "Import permits from seamless docs"
  task permits: :environment do
    ImportPermitsWorker.perform_async('CO18041000056728845', 'WESTBOROUGH', 'STREET_OPENING')
    ImportPermitsWorker.perform_async('CO18041000056724482', 'WESTBOROUGH', 'TRENCH')
  end
end
