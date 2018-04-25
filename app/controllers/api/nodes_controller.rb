module Api
  class NodesController < ApiController
    # GET /nodes?id[]=1&id[]=2
    def index
      if params[:id]
        nodes = Node.select("id, ST_AsGeoJSON(geometry) as geojson, part_of, neighbors").find(params[:id])
        respond_to do |format|
          format.json { render json: nodes }
        end
      elsif params[:city] || params[:road]
        roads = params[:city] ? Road.where(city_name: params[:city].upcase.gsub(/-/, " ")) : Road.find(params[:road])
        node_ids = roads.reduce([]) do |ids, road|
          ids + road.nodes
        end
        nodes = Node.select("id, ST_AsGeoJSON(geometry) as geojson, part_of, neighbors").where(id: node_ids)
        respond_to do |format|
          format.json { render json: nodes }
        end
      else
        respond_to do |format|
          format.json { render json: [], status: :bad_request }
        end
      end
    end
  end
end
