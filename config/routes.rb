Rails.application.routes.draw do
  resources :restaurants
  resources :comments
  get '/', to: 'genres#index'
  resources :genres
  get '(*path)', to: 'application#index'

end
