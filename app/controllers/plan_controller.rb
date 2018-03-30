class PlanController < ApiController

  # POST api/plan
  def create
    begin
      createdPlan = Plan.create(
        name: params[:plan][:name],
        type: params[:plan][:type],
        city: params[:plan][:city],
        published: params[:plan][:published]
      )
      createdTimeframes = []
      createdSegments = []
      params[:timeframes].each do |timeframe|
        createdTimeframes.push(Timeframe.create(
          plan_id: createdPlan.id,
          start: timeframe[:start],
          end: timeframe[:end]
        ))
      end
      params[:segments].each do |segment|
        createdSegments.push(Segment.create(
          timeframe_id: createdTimeframes[segment[:timeframe_id]].id,
          road_id: segment[:road_id],
          is_whole_road: segment[:is_whole_road],
          is_orig_type_address: segment[:is_orig_type_address],
          orig: segment[:orig],
          is_dest_type_address: segment[:is_dest_type_address],
          dest: segment[:dest],
          nodes: segment[:nodes],
          custom_nodes: segment[:custom_nodes],
        ))
      end
    rescue => error
      puts error
      return respond_to do |format|
        format.json {
          render json: { success: false, error: error }, status: :bad_request
        }
      end
    end
    respond_to do |format|
      format.json {
        render json: {
          success: true,
          data: {
            plan: createdPlan,
            timeframes: createdTimeframes,
            segments: createdSegments,
          }
        }
      }
    end
  end

  # GET /api/plan/1
  def show
    plan = Plan.find(params[:id])
    timeframes = Timeframe.where(plan_id: plan.id)
    segments = Segment.where(timeframe_id: timeframes.map { |timeframe| timeframe.id })
    respond_to do |format|
      format.json {
        render json: {
          success: true,
          data: {
            plan: plan,
            timeframes: timeframes,
            segments: segments,
          }
        }
      }
    end
  end

  # GET /api/plan?city=AYER
  def index
    plans = Plan.where(city: params[:city], published: true)
    timeframes = Timeframe.where(plan_id: plans.map { |plan| plan.id })
    segments = Segment.where(timeframe_id: timeframes.map { |timeframe| timeframe.id })
    respond_to do |format|
      format.json {
        render json: {
          success: true,
          data: {
            plans: plans,
            timeframes: timeframes,
            segments: segments,
          }
        }
      }
    end
  end
end
