class AddLanguageToQuiz < ActiveRecord::Migration[6.1]
  def change
    add_column :quizzes, :language, :string, default: 'English'
  end
end
