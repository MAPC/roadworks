class NodeController < ApplicationController
  # GET /node?id=1,2,3
  def index
    @nodes = Node.select("id, ST_AsGeoJSON(geometry) as geojson, part_of, neighbors").find(params[:id])
    puts @nodes[0]
    respond_to do |format|
      format.json { render json: { success: true, data: @nodes.as_json } }
    end
  end
end
