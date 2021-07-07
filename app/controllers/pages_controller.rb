class PagesController < ApplicationController
  def home; end

  def search
    @teacher = User.find_by(username: params[:search])
    if @teacher
      redirect_to teacher_url(@teacher.id)
    else
      redirect_to root_path
    end
  end
end
