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
    if @quiz.save
      save_questions
      redirect_to quizzes_path
    else
      render :new, locals: { questions: params[:words] }
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

  def results; end

  def current_status
    render json: @quiz.to_json(include: %i[questions players])
  end

  def reset_quiz
    @quiz.players.destroy_all
  end

  def update_best
    @player = Player.where('name = ? AND quiz_id = ?', params[:name], params[:id]).first
    if @player
      @player.best_time = params[:best_time]
      @player.save
    else
      @player = Player.create!({ name: params[:name], quiz_id: params[:id], best_time: params[:best_time] })
    end
    render json: @player.to_json
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
    return unless params[:words]

    params[:words].each do |word|
      Question.create(word: word, quiz: @quiz) unless word == ''
    end
  end
end
