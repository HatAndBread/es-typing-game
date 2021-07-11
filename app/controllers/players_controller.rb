class PlayersController < ApplicationController
  def create
    @player = Player.new(player_params)
  end

  private

  def player_params
    params.require(:player).permit(:name, :best_time, :best_mistakes)
  end
end
