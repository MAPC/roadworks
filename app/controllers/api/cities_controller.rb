module Api
  class CitiesController < ApiController
    def show
      bounds = "ST_GeomFromText('MULTIPOLYGON(((-74.5 41,-74.5 43,-69 43,-69 41,-74.5 41)))', 4326)"
      puts params[:id].upcase.gsub(/-/, " ")
      city = City
          .select("id, name, city_code, ST_AsGeoJSON(geometry) AS geojson, "\
              "ST_AsGeoJSON(ST_difference(#{bounds}, geometry)) as mask, "\
              "ST_AsGeoJSON(ST_Centroid(geometry)) as centroid, "\
              "ST_AsGeoJSON(ST_Expand(ST_Envelope(geometry), 0.1, 0.05)) as bounds")
          .where(name: params[:id].upcase.gsub(/-/, " ")).first
      puts city
      respond_to do |format|
        format.json { render json: city }
      end
    end
  end
end
