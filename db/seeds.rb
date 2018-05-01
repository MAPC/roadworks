# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if Rails.env.development? || Rails.env.test? || Rails.env.staging?
  sh "pg_restore -Fc -O -a -t nodes -t roads -t raw_segments -t cities -d #{Rails.configuration.database_configuration[Rails.env]['database']} lib/seeds/roadworks.dump" || true
else
  sh "pg_restore -Fc -O -a -t nodes -t roads -t cities -h #{Rails.configuration.database_configuration[Rails.env]['host']} -p 5433 -U #{Rails.configuration.database_configuration[Rails.env]['username']} -w -d #{Rails.configuration.database_configuration[Rails.env]['database']} lib/seeds/roadworks.dump" || true
end
