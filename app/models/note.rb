class Note < ActiveRecord::Base
  has_many :chapters
  has_many :sections, through: :chapters
  belongs_to :user

  default_scope { order(updated_at: :desc) }

  
  scope :search_keyword_user, -> (keyword){
      joins(:user).where("user.name like #{keyword}")
  }

  scope :search_keyword_chapter, -> (keyword){
      joins(:chapters).where("chapters.title like #{keyword}") 
  }


  def self.filter(filtering_params)
    results = self.all
    filtering_params.each do |key, value|
      results = results.public_send(key, value)
    end
    results
  end

  def self.keyword_search(keyword)
    
  end

  def hot
    @news = Note.order(:like).limit(11)
  end

  def recent_hot 
  end
end
