class FavoritesController < ApplicationController
  def index
    return unless user_signed_in?

    @favorites = current_user.favorites
    respond_to do |format|
      format.html
      format.json { render json: @favorites }
    end
  end
end
