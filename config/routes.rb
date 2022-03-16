require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq' if Rails.env.development?
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?

  devise_for :users
  root to: 'articles#index'
  resource :timeline, only: [:show]

  resources :articles do
    resources :comments, only: %i[index new create]
    resource :like, only: %i[show create destroy]
  end

  resource :profile, only: %i[show edit update]
  resources :favorites, only: %i[index]
  resources :accounts, only: %i[show] do
    resources :follows, only: %i[create]
    resources :unfollows, only: [:create]
  end
end
