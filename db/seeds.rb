User.destroy_all

joshua = User.create({ password: '123123', email: 'a@b.com', username: 'joshua' })
p "User created: #{joshua}"
10.times do
  quiz = Quiz.create({ title: Faker::Book.title, user: joshua })
  p "New quiz created: #{quiz}"
end

100.times do
  question = Question.create({ word: Faker::Creature::Animal.name, quiz: Quiz.all.sample })
  p "New question created: #{question}"
end

80.times do
  Player.create({ name: Faker::Name.first_name, quiz: Quiz.all.sample, best_time: (10..30).to_a.sample,
                  best_mistakes: (0..10).to_a.sample })
end
