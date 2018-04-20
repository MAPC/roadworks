module Api
  class PlansController < ApiController
    ALL_COLORS = [
      "#F44336", # Red
      "#3F51B5", # Indigo
      "#2196F3", # Blue
      "#009688", # Teal
      "#4CAF50", # Green
      "#FFC107", # Amber
      "#673AB7", # Deep Purple
      "#FF5722", # Dark Orange
      "#9C27B0", # Purple
      "#FF9800", # Orange
      "#9C27B0", # Pink
      "#03A9F4", # Light Blue
      "#00BCD4", # Cyan
      "#8BC34A", # Light Green
      "#CDDC39", # Lime
      "#FFEB3B", # Yellow
    ].freeze

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
            custom_nodes: [
              :id,
              :address,
              neighbors: [],
              geojson: [
                :type,
                coordinates: [],
              ],
            ],
            nodes: []
          ]
        ]
      )
    end

    def get_next_plan_color(city)
      plans = Plan.select('color').where(city: city)
      used_colors = plans.map { |p| p[:color] }
      available_colors = ALL_COLORS - used_colors
      return available_colors.length > 0 ? available_colors[0] : ALL_COLORS[0]
    end

    # POST api/plan
    def create
      permitted_params = permit_plan_params(params)
      next_color = get_next_plan_color(permitted_params[:city])
      permitted_params[:color] = next_color
      plan = Plan.create!(permitted_params)
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
      plans = Plan.where(city: params[:city].upcase.gsub(/-/, " "), published: true)
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
