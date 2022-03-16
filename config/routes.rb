require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq' if Rails.env.development?
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?

  devise_for :users
  root to: 'articles#index'
  resource :timeline, only: [:show]

  resources :articles

  resource :profile, only: %i[show edit update]
  resources :favorites, only: %i[index]
  resources :accounts, only: %i[show] do
    resources :follows, only: %i[create]
    resources :unfollows, only: [:create]
  end

  namespace :api, defaults: {format: :json} do
    scope '/articles/:article_id' do
      resources :comments, only: [:index, :create]
      resource :like, only: [:show, :create, :destroy]
    end
  end
end
