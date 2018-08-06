require 'faraday'
require 'json'
require 'rgeo'

class Permit < ApplicationRecord
  before_save :geocode

  def geocode
    return unless self.address
    geographic_factory = RGeo::Geographic.spherical_factory(:srid => 4326)
    response = Faraday.get('http://pelias.mapc.org/v1/search?text=' + self.address)
    result = JSON.parse(response.body)
    return unless result && result['features'] && result['features'].length > 0
    feature = result['features'][0]
    return unless feature['geometry'] && feature['properties']
    properties = feature['properties']
    geometry = feature['geometry']
    return unless properties['street'] && properties['locality'] && geometry['coordinates']
    street = properties['street'].upcase
    locality = properties['locality'].upcase
    coordinates = geometry['coordinates']
    snap_query = <<~SQL
      SELECT
        id,
        name,
        city_name,
        ST_AsGeoJSON(ST_LineInterpolatePoint((dumped.line).geom, ST_LineLocatePoint((dumped.line).geom, ST_SetSRID(ST_MakePoint(#{coordinates[0]}, #{coordinates[1]}), 4326)))) as snap,
        ST_Distance((dumped.line).geom, ST_SetSRID(ST_MakePoint(#{coordinates[0]}, #{coordinates[1]}), 4326)) as distance
      FROM (
        SELECT
          id,
          name,
          city_name,
          ST_Dump(geometry) as line
        FROM
          roads
        WHERE
          name='#{street}' and
          city_name='#{locality}'
        ) as dumped
      ORDER BY distance ASC
      LIMIT 1;
    SQL
    road = ActiveRecord::Base.connection.exec_query(snap_query).to_hash
    if road && road[0] && road[0]['snap']
      coordinates = JSON.parse(road[0]['snap'])['coordinates']
    end
    point = geographic_factory.point(coordinates[0], coordinates[1])
    self.geometry = point
  end
end
