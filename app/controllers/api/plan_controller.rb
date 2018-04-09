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
      plan = Plan.new(planHash)
      # plan.timeframes.build(planHash[:timeframes_attributes])
      plan.save!
      # begin
      #   planHash = Plan.create!(
      #     name: params[:plan][:name],
      #     type: params[:plan][:type],
      #     city: params[:plan][:city],
      #     published: params[:plan][:published]
      #   ).attributes
      #   planHash[:timeframes] = params[:plan][:timeframes].map do |timeframe|
      #     timeframeHash = Timeframe.create!(
      #       plan_id: planHash[:id],
      #       start: timeframe[:start],
      #       end: timeframe[:end]
      #     ).attributes
      #     timeframeHash[:segments] = timeframe[:segments].map do |segment|
      #       return Segment.create!(
      #         timeframe_id: timeframeHash[:id],
      #         road_id: segment[:road_id],
      #         is_segment: segment[:is_segment],
      #         is_orig_type_address: segment[:is_orig_type_address],
      #         orig: segment[:orig],
      #         is_dest_type_address: segment[:is_dest_type_address],
      #         dest: segment[:dest],
      #         nodes: segment[:nodes],
      #         custom_nodes: segment[:custom_nodes],
      #       ).attributes
      #     end
      #     return timeframeHash
      #   end
      # rescue => error
      #   puts error
      #   return respond_to do |format|
      #     format.json {
      #       render json: { success: false, error: error }, status: :bad_request
      #     }
      #   end
      # end
      respond_to do |format|
        format.json {
          render json: {
            success: true,
            data: {
              plan: plan,
            }
          }
        }
      end
    end

    # GET /api/plan/1
    def show
      planHash = Plan.find(params[:id]).attributes
      timeframes = Timeframe.where(plan_id: plan.id)
      planHash[:timeframes] = timeframes.map do |timeframe|
        timeframeHash = timeframe.attributes
        timeframeHash[:segments] = Segment.where(timeframe_id: timeframe.id)
            .map { |segment| segment.attributes }
        return timeframeHash
      end
      respond_to do |format|
        format.json {
          render json: {
            success: true,
            data: {
              plan: planHash,
            }
          }
        }
      end
    end

    # GET /api/plan?city=AYER
    def index
      plans = Plan.where(city: params[:city], published: true)
      plansHashes = plans.map do |plan|
        planHash = plan.attributes
        timeframes = Timeframe.where(plan_id: plans.map { |plan| plan.id })
        planHash[:timeframes] = timeframes.map do |timeframe|
          timeframeHash = timeframe.attributes
          segments = Segment.where(timeframe_id: timeframeHash[:id])
          timeframeHash[:segments] = segments.map { |segment| segment.attributes }
          return timeframeHash
        end
        return planHash
      end
      respond_to do |format|
        format.json {
          render json: {
            success: true,
            data: {
              plans: plansHashes
            }
          }
        }
      end
    end
  end
end
