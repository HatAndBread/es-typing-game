class QuizzesController < ApplicationController
  before_action :set_quiz, except: %i[index new create teacher]
  before_action :authenticate_user!, only: %i[new edit index]

  def index
    @quizzes = current_user.quizzes.all
  end

  def show; end

  def new
    @quiz = Quiz.new
  end

  def create
    @quiz = Quiz.create(quiz_params)
    @quiz.user = current_user
    if @quiz.save!
      save_questions
      redirect_to quizzes_path
    end
  end

  def edit; end

  def update
    if @quiz.update!(quiz_params)
      save_questions
      redirect_to quiz_path(@quiz)
    else
      puts 'failed to save'
    end
  end

  def destroy
    render json: { message: 'ok' } if @quiz.destroy
  end

  def teacher
    @quizzes = Quiz.where(user_id: params[:id])
  end

  private

  def set_quiz
    @quiz = Quiz.find(params[:id])
  end

  def quiz_params
    params.require(:quiz).permit(:title, :user)
  end

  def save_questions
    @quiz.questions.destroy_all
    params[:words].each do |word|
      @question = Question.create!(word: word, quiz: @quiz)
    end
  end
end
