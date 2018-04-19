class SessionsController < Devise::SessionsController
  respond_to :html, :json

  def create
    super
  end

  def new
    super
  end
end
