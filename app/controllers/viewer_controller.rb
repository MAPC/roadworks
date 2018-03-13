# frozen_string_literal: true

class ViewerController < ApplicationController
  layout "viewer"

  def index
    @viewer_props = { name: "MAPC" }
  end
end
