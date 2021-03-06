class Task < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :creator, class_name: 'User', foreign_key: 'created_by'

  enum status: { todo: 0, doing: 1, done: 2 }

  validates :title, presence: true, length: { maximum: 200 }
  validates :content, presence: true, length: { maximum: 1000 }

end
