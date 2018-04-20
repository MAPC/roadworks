class SessionsController < Devise::SessionsController
  respond_to :html, :json
  #protect_from_forgery except: :sign_out

  def create
    super
  end

  def new
    super
  end

  def destroy
    super
  end
end
