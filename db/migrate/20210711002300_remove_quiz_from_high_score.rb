class RemoveQuizFromHighScore < ActiveRecord::Migration[6.1]
  def change
    remove_reference :high_scores, :quiz, null: false, foreign_key: true
  end
end
