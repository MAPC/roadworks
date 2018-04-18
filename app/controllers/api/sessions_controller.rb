class Api::SessionsController < Devise::SessionsController
  respond_to :html, :json

  def create
    binding.pry
    skip_authorization
    super
  end

  def new
    skip_authorization
    super
  end
end
