# frozen_string_literal: true

class ViewerController < ApplicationController
  include ReactOnRails::Controller
  layout "viewer"

  before_action :data

  before_action :initialize_store

  def index
    @viewer_props = {}
  end

  def initialize_store
    redux_store("store", props: @app_props_server_render)
  end

  def data
    # This is the props used by the React component.
    @app_props_server_render = {
      plan: { test: 1 }
    }
  end
end
