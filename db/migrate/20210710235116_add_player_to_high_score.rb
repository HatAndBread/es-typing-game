class AddPlayerToHighScore < ActiveRecord::Migration[6.1]
  def change
    add_reference :high_scores, :player, null: false, foreign_key: true
  end
end
