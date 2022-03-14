class FavoritesController < ApplicationController
  def index
    return unless user_signed_in?

    @favorites = current_user.favorites
    respond_to do |format|
      format.html
      format.json { render json: @favorites }
    end
  end

  def create
    @favorite = Favorite.new(favorite_params)
    @favorite.user = current_user
    if @favorite.save
      render json: @favorite
    else
      render json: {}
    end
  end

  private

  def favorite_params
    params.require('favorite').permit(:name, :lat, :lon)
  end
end
