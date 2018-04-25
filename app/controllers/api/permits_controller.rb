module Api
  class PermitsController < ApplicationController
    before_action :set_permit, only: [:show, :edit, :update, :destroy]

    # GET /permits
    # GET /permits.json
    def index
      permits = Permit.select('id, permit_type, applicant_name, start_date, end_date, address, application_data, city_name, ST_AsGeoJSON(geometry) AS geojson')
          .where(city_name: params[:city].upcase.gsub(/-/, " "))
      if permits
        respond_to do |format|
          format.json { render json: permits }
        end
      else
        respond_to do |format|
          format.json { render json: [], status: :bad_request }
        end
      end
    end

    # GET /permits/1
    # GET /permits/1.json
    def show
    end

    # POST /permits
    # POST /permits.json
    def create
      @permit = Permit.new(permit_params)

      respond_to do |format|
        if @permit.save
          format.html { redirect_to @permit, notice: 'Permit was successfully created.' }
          format.json { render :show, status: :created, location: @permit }
        else
          format.html { render :new }
          format.json { render json: @permit.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /permits/1
    # PATCH/PUT /permits/1.json
    def update
      respond_to do |format|
        if @permit.update(permit_params)
          format.html { redirect_to @permit, notice: 'Permit was successfully updated.' }
          format.json { render :show, status: :ok, location: @permit }
        else
          format.html { render :edit }
          format.json { render json: @permit.errors, status: :unprocessable_entity }
        end
      end
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_permit
        @permit = Permit.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def permit_params
        params.require(:permit).permit(:permit_type, :applicant_name, :start_date, :end_date, :address, :payload, :geometry)
      end
  end
end
