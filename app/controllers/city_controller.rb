class CityController < ApplicationController
  include ReactOnRails::Controller

  layout "city"

  before_action :data

  before_action :initialize_store

  def index
    @viewer_props = {}
  end

  def initialize_store
    redux_store("store", props: @app_props_server_render)
  end

  def data
    roads = Road
        .select("roads.*, ST_AsGeoJSON(geometry) AS geojson")
        .where(mgis_town: params[:city].upcase)
    cache = Hash.new
    roads.each do |road|
      cache[road.id] = road
    end
    @app_props_server_render = {
      road: {
        cache: cache,
        cityIndex: cache.keys
      }
    }
  end
end
