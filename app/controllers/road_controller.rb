class RoadController < ApplicationController
  include ReactOnRails::Controller
  # GET /road?city=AYER
  def index
    @roads = Road
        .select("roads.*, ST_AsGeoJSON(geometry) AS geojson")
        .where(mgis_town: params[:city]).order("name")
    respond_to do |format|
      format.json { render json: { success: true, data: @roads.as_json } }
    end
  end
  def show
    @roads = Road
        .select("roads.*, ST_AsGeoJSON(geometry) AS geojson")
        .find(params[:id])
    respond_to do |format|
      format.json { render json: { success: true, data: @roads.as_json } }
    end
  end
end
