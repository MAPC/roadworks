module Api
  class UsersController < ApiController
    before_action :authenticate_user!
    before_action :require_permission

    def require_permission
      if current_user.role != 'city'
        render json: [], status: :unauthorized
      end
    end

    def index
      users = User.select('id, name, email, city_name, role, token')
          .where(city_name: current_user.city_name, created_by: current_user.id)
      respond_to do |format|
        format.json { render json: users }
      end
    end

    def create
      user_params = params[:user].permit(:name)
      user_params[:city_name] = current_user.city_name
      user_params[:created_by] = current_user.id
      if (user = User.create!(user_params))
        respond_to do |format|
          format.json { render json: user }
        end
      else
        respond_to do |format|
          format.json { render json: nil, status: :bad_request }
        end
      end
    end

    def update
    end
  end
end
