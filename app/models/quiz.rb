class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  # validates :title, presence: true, uniqueness: {scope: :user}
  validates_presence_of :title, on: :create, message: 'Please select a quiz title'
  validates_uniqueness_of :title, on: :create, message: 'Sorry, that quiz title is already taken',
                                  uniqueness: { scope: :user }
end
