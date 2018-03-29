class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  layout "application"
  def index
  end
end
