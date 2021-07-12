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

  def destroy
    @player = Player.find(params[:id])
    @player.destroy!
    render json: { message: 'ok' }.to_json
  end

  private

  def set_player
    @player = Player.new(player_params)
  end

  def player_params
    params.require(:player).permit(:name, :best_time, :best_mistakes, :quiz_id)
  end
end
