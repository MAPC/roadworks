module Api
  class PlansController < ApiController
    before_action :authenticate_user!, except: [ :index, :show ]
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
        :id,
        :name,
        :city,
        :published,
        :plan_type,
        timeframes_attributes: [
          :id,
          :start,
          :end,
          :_destroy,
          segments_attributes: [
            :id,
            :road_id,
            :is_segment,
            :is_orig_type_address,
            :orig,
            :is_dest_type_address,
            :dest,
            :_destroy,
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
      permitted_params[:user_id] = current_user.id
      puts permitted_params
      plan = Plan.create!(permitted_params)
      if plan
        respond_to do |format|
          format.json { render json: plan }
        end
      else
        render json: plan.errors.full_messages, status: :bad_request
      end
    end

    def update
      permitted_params = permit_plan_params(params)
      plan = Plan.find_by(id: permitted_params[:id])
      unless plan
        return render json: {}, status: :bad_request
      end
      unless plan[:user_id] == current_user.id
        return render json: {}, status: :unauthorized
      end
      permitted_params[:color] = plan[:color]
      if plan.update(permitted_params)
        respond_to do |format|
          format.json { render json: plan }
        end
      else
        render json: plan.errors.full_messages, status: :bad_request
      end
    end

    def destroy
      plan = Plan.find_by(id: params[:id])
      unless plan
        return render json: {}, status: :bad_request
      end
      unless plan[:user_id] == current_user.id
        return render json: {}, status: :unauthorized
      end
      plan.destroy
      respond_to do |format|
        format.json { render json: plan }
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
        respond_to do |format|
          format.json { render json: [], status: :bad_request }
        end
      end
    end
  end
end
