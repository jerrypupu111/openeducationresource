CoLearning::Application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  resources :pads do
    resource 'embed', :only => :show do
      get 'nosig'
      get 'noemail'
      get 'script'
    end
    resources 'revisions', :only => [ :index, :show ]
  end

  resources :notes do
    resources :chapters do
      resources :sections
    end
  end
  post 'notes/reorder', to:'notes#reorder'
  resources :chapters do
    resources :sections
  end

  resources :sections 
   
  post 'sections/:id/createqa', to:'sections#createqa', as: 'createqa_section'


  resources :questions

  get 'user', to:'user#index'
  
  post 'sections/:id/copy', to: 'sections#copy'

  get 'home' ,to: 'home#index'
  root 'home#index'
  get 'home/search', to: 'home#search'
  get 'home/favorite',to:'home#favorite',as: 'favorite_home'

  get 'auth/facebook', as: "fb_login"
  get 'auth/facebook/callback', to: 'sessions#create'

  get 'signout', to: 'sessions#destroy', as: 'signout'
  get 'signin', to:'sessions#login', as: 'signin'
  
  post 'likes/:id/like_toggle',to:'likes#like_toggle'
  post 'likes/:id/bookmark_toggle',to:'likes#bookmark_toggle'
  post 'tags/create',to:'tags#create'
  post 'tags/get',to:'tags#get'
end
