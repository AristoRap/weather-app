Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  resources :favorites, only: %i[index create update destroy]
end
