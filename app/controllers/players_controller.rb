class PlayersController < ApplicationController
  def create
    @player = Player.new(player_params)
    @player.quiz = Quiz.find(params[:quiz_id])
    if @player.save
      render json: @player.to_json
    else
      render json: { error: true }.to_json
    end
  end

  private

  def player_params
    params.require(:player).permit(:name, :best_time, :best_mistakes, :quiz_id)
  end
end
