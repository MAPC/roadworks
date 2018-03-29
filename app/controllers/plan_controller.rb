class PlanController < ApiController

  # POST api/plan
  def create
    begin
      createdPlan = Plan.create(params[:plan])
      createdTimeframes = []
      createdSegments = []
      params[:timeframes].each do |timeframe|
        timeframe.plan = plan.id
        createdTimeFrames.push(Timeframe.create(timeframe))
      end
      params[:segments].each do |segment|
        segment.timeframe = createdTimeFrames[segment.timeframe].id
        createdSegments.push(Segment.create(segment))
      end
    rescue
      respond_to do |format|
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
    segments = Segment.find(timeframes.map { |t| t.id })
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
end
