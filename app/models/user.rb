class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :plans, inverse_of: :user

  enum role: [:utility, :city]


  private

  def set_default_role
    self.role ||= :utility
  end

end
