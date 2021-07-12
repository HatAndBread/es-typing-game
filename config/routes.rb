Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'pages#home'

  resources :quizzes do
    member do
      get :current_status
      get :reset_quiz
      post :update_best
    end
    resources :players, only: %i[create]
  end
  delete '/player/:id', to: 'players#destroy', as: :player
  get '/teacher/:id', to: 'quizzes#teacher', as: :teacher
  get '/quiz_results/:id', to: 'quizzes#results', as: :results
  get '/search', to: 'pages#search', as: :search
end
