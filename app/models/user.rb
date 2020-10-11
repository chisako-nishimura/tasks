class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :tasks
  # TODO: relationあとで
  # has_many :tasks, class_name: 'Task', :foreign_key => 'user_id'
  # has_many :tasks, class_name: 'Task', :foreign_key => 'user_id'
end
