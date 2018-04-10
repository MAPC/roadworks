module Api
  class NodesController < ApiController
    # GET /node/1
    def show
      @nodes = Node.select("id, ST_AsGeoJSON(geometry) as geojson, part_of, neighbors").find(params[:id])
      respond_to do |format|
        format.json { render json: { success: true, data: @nodes.as_json } }
      end
    end
  end
end
