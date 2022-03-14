Rails.application.routes.draw do
  devise_for :users
  root to: 'articles#index'

  resources :articles do
    resources :comments, only: %i[new create]
    resource :like, only: %i[create destroy]
  end

  resource :profile, only: %i[show edit update]
  resources :favorites, only: %i[index]
  resources :accounts, only: %i[show] do
    resources :follows, only: %i[create]
  end
end
