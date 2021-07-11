Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'pages#home'

  resources :quizzes do
    resources :players, only: [:create]
  end
  get '/teacher/:id', to: 'quizzes#teacher', as: :teacher
  get '/quiz_results/:id', to: 'quizzes#results', as: :results
  get '/search', to: 'pages#search', as: :search
end
