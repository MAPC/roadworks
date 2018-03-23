class RoadController < ApplicationController
  include ReactOnRails::Controller
  # GET /road?city=AYER
  def index
    @roads = Road.where(mgis_town: params[:city]).order("name")
    respond_to do |format|
      format.json { render json: { success: true, data: @roads.as_json } }
    end
  end
  def show
    @roads = Road.find(params[:id])
    respond_to do |format|
      format.json { render json: { success: true, data: @roads.as_json } }
    end
  end
end
