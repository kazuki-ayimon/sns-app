Rails.application.routes.draw do
  devise_for :users
  root to: 'articles#index'
  resource :timeline, only: [:show]

  resources :articles do
    resources :comments, only: %i[new create]
    resource :like, only: %i[show create destroy]
  end

  resource :profile, only: %i[show edit update]
  resources :favorites, only: %i[index]
  resources :accounts, only: %i[show] do
    resources :follows, only: %i[create]
    resources :unfollows, only: [:create]
  end
end
