require 'faraday'
require 'json'
require 'rgeo'

class Permit < ApplicationRecord
  before_save :geocode

  def geocode
    geographic_factory = RGeo::Geographic.spherical_factory(:srid => 4326)
    response = Faraday.get('http://pelias.mapc.org/v1/search?text=' + self.address)
    result = JSON.parse(response.body)
    if result && result['features'] && result['features'].length > 0 && result['features'][0]['geometry']
      coordinates = result['features'][0]['geometry']['coordinates']
      point = geographic_factory.point(coordinates[0], coordinates[1])
      puts point
      self.geometry = point
    end
  end
end
