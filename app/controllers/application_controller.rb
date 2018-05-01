class ApplicationController < ActionController::Base
  before_action :check_token
  layout "application"
  def index
  end

  def check_token
    return if (token = params[:token]).blank?
    if (user = User.find_by_token(token))
      sign_in(user)
    end
    redirect_to request.path, params.except(:token, :action, :controller)
  end
end
