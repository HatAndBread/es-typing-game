class PagesController < ApplicationController
  def home; end

  def search
    @teacher = User.find_by(username: params[:search])
    if @teacher
      redirect_to teacher_url(@teacher.id)
    else
      render :home, locals: { errors: 'We could not find that teacher 😢 Please try again ✨' }
    end
  end
end
