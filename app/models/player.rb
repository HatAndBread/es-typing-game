class Player < ApplicationRecord
  belongs_to :quiz
  validates :name, uniqueness: { scope: :quiz }
end
