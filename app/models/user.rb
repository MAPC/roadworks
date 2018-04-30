class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  before_create :generate_token_if_no_password

  devise :database_authenticatable, :rememberable, :trackable, :validatable
  has_many :plans, inverse_of: :user

  enum role: [:utility, :city]

  private

  def set_default_role
    self.role ||= :utility
  end

  def password_required?
    false
  end

  def email_required?
    false
  end

  def generate_token_if_no_password
    unless self.password
      SecureRandom.hex(16).tap do |random_token|
        self.token = random_token
      end
    end
  end

end
