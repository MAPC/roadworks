class CityController < ApplicationController
  include ReactOnRails::Controller

  layout "city"

  def index
    @viewer_props = {}
  end
end
