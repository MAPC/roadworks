class PlanController < ApiController

  # POST api/plan
  def create
    begin
      createdPlan = Plan.create(params[:plan])
      createdTimeframes = []
      createdSegments = []
      params[:timeframes].each do |timeframe|
        timeframe.plan_id = plan.id
        createdTimeFrames.push(Timeframe.create(timeframe))
      end
      params[:segments].each do |segment|
        segment.timeframe_id = createdTimeFrames[segment.timeframe_id].id
        createdSegments.push(Segment.create(segment))
      end
    rescue => error
      puts error
      return respond_to do |format|
        format.json {
          render json: { success: false }, status: :bad_request
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
    timeframes = Timeframe.find(plan: plan.id)
    segments = Segment.find(timeframe: timeframes.map { |timeframe| timeframe.id })
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
  def show
    plans = Plan.find(city: params[:city], published: true)
    timeframes = Timeframe.find(plan: plans.map { |plan| plan.id })
    segments = Segment.find(timeframe: timeframes.map { |timeframe| timeframe.id })
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
