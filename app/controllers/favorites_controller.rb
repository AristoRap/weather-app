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
    @favorites = current_user.favorites
    if @favorite.save
      render json: @favorites
    else
      render json: {}
    end
  end

  def destroy
    @favorite = Favorite.find(params[:id])
    @favorites = current_user.favorites
    @favorite.destroy
    if @favorite.destroyed?
      render json: @favorites
    else
      redirect_to root_path, alert: 'Something went wrong when removing from favorites'
    end
  end

  private

  def favorite_params
    params.require('favorite').permit(:name, :lat, :lon)
  end
end
