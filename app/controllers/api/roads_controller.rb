module Api
  class RoadsController < ApiController
    # GET /road?city=ayer
    def index
      binding.pry
      if params[:city]
        roads = Road
            .select("roads.*, ST_AsGeoJSON(geometry) AS geojson")
            .where(city_name: params[:city].upcase.gsub(/-/, " ")).order("name")
        respond_to do |format|
          format.json { render json: roads }
        end
      elsif params[:id]
        roads = Road
            .select("roads.*, ST_AsGeoJSON(geometry) AS geojson")
            .where(id: params[:id]).order("name")
        respond_to do |format|
          format.json { render json: roads }
        end
      end
    end

    def show
      roads = Road
          .select("roads.*, ST_AsGeoJSON(geometry) AS geojson")
          .find(params[:id])
      respond_to do |format|
        format.json { render json: roads }
      end
    end
  end
end
