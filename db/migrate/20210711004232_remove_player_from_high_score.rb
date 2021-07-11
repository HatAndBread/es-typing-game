class RemovePlayerFromHighScore < ActiveRecord::Migration[6.1]
  def change
    remove_reference :high_scores, :player, null: false, foreign_key: true
  end
end
