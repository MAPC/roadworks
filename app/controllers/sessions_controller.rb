class SessionsController < Devise::SessionsController
  respond_to :html, :json

  def create
    super do |user|
      if request.format.json?
        data = {
          token: user.authentication_token,
          user_id: user.id,
          email: user.email,
          role: user.role,
        }
        render json: data, status: 201 and return
      end
    end
  end

  def new
    super
  end
end
