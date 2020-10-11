Rails.application.routes.draw do
  resources :tasks
  devise_for :users, skip: [:registrations]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'
  get 'pages/show'

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
