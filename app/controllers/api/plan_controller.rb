module Api
  class PlanController < ApiController
    # POST api/plan
    def create
      planHash = params[:plan]
      planHash[:timeframes_attributes] = planHash[:timeframes]
      planHash.delete(:timeframes)
      planHash[:timeframes_attributes].each.with_index do |timeframe, index|
        planHash[:timeframes_attributes][index][:segments_attributes] = planHash[:timeframes_attributes][index][:segments]
        planHash[:timeframes_attributes][index].delete(:segments)
      end
      planHash.permit!
      plan = Plan.create!(planHash)
      respond_to do |format|
        format.json {
          render json: {
            success: true,
            data: {
              plan: PlanSerializer.new(plan),
            }
          }
        }
      end
    end

    # GET /api/plan/1
    def show
      plan = Plan.find(params[:id])
      respond_to do |format|
        format.json {
          render json: {
            success: true,
            data: {
              plan: PlanSerializer.new(plan),
            }
          }
        }
      end
    end

    # GET /api/plan?city=AYER
    def index
      plans = Plan.where(city: params[:city], published: true)
      respond_to do |format|
        format.json {
          render json: {
            success: true,
            data: {
              plans: ActiveModel::SerializableResource.new(
                plans,
                each_serializer: PlanSerializer
              ),
            }
          }
        }
      end
    end
  end
end
