module Api
  class PlansController < ApiController
    def permit_plan_params(params)
      plan = params[:plan]
      plan[:city] = params[:city]
      plan[:published] = params[:published]
      plan[:timeframes_attributes] = plan[:timeframes]
      plan.delete(:timeframes)
      plan[:timeframes_attributes].each do |timeframe|
        timeframe[:segments_attributes] = timeframe[:segments]
        timeframe.delete(:segments)
      end
      return params.require(:plan).permit(
        :name,
        :city,
        :published,
        :plan_type,
        timeframes_attributes: [
          :start,
          :end,
          segments_attributes: [
            :road_id,
            :is_segment,
            :is_orig_type_address,
            :orig,
            :is_dest_type_address,
            :dest,
            custom_nodes: [],
            nodes: []
          ]
        ]
      )
    end

    # POST api/plan
    def create
      plan = Plan.create!(permit_plan_params(params))
      if plan
        respond_to do |format|
          format.json { render json: plan }
        end
      else
        render json: plan.errors.full_messages, status: :bad_request
      end
    end

    # GET /api/plan/1
    def show
      plan = Plan.find(params[:id])
      if plan
        respond_to do |format|
          format.json { render json: plan }
        end
      else
        render json: plan.errors.full_messages, status: :bad_request
      end
    end

    # GET /api/plan?city=AYER
    def index
      plans = Plan.where(city: params[:city], published: true)
      if plans
        respond_to do |format|
          format.json { render json: plans }
        end
      else
        render json: plans.errors.full_messages, status: :bad_request
      end
    end
  end
end
