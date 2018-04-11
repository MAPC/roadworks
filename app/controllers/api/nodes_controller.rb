module Api
  class NodesController < ApiController
    # GET /nodes?id[]=1&id[]=2
    def index
      @nodes = Node.select("id, ST_AsGeoJSON(geometry) as geojson, part_of, neighbors").find(params[:id])
      respond_to do |format|
        format.json { render json: { success: true, data: @nodes.as_json } }
      end
    end
  end
end
