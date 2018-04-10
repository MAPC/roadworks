module Api
  class RoadsController < ApiController
    # GET /road?city=ayer
    def index
      @roads = Road
          .select("roads.*, ST_AsGeoJSON(geometry) AS geojson")
        .where(city_name: params[:city].upcase).order("name")
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
end
