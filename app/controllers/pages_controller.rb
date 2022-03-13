class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    respond_to do |format|
      format.html
      format.json { render json: user_signed_in? ? current_user : {} }
    end
  end
end
