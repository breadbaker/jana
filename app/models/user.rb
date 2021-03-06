class User < ActiveRecord::Base
  attr_accessible(
    :email,
    :pwd_hash,
    :token, :password,
    :first_name,
    :image,
    :last_name,
    :uid,
    :confirmed,
    :confirm_token
  )

  before_save :legit_email

	before_create :set_admin,  :set_confirm_token
	validates_presence_of  :email

  validates_uniqueness_of  :email

  def legit_email
    raise "Invalid Email" unless self.email && self.email.match(/^.+@.+$/)
  end

	def set_admin
		if ['janabake@gmail.com','danielebaker@gmail.com'].include?(self.email)
			self.admin = true
		end
	end

  def set_confirm_token
    self.confirm_token = generate_token
  end

  def change_pass!(data)
    if data[:new] != data[:confirm]
      raise 'Passwords do not match'
    end
    self.password= data[:new]
  end

  def change_email!(data)

    user_with = User.find_by_email(data[:email])
    raise 'Email Taken' if user_with
    self.email = data[:email]

    return "Email Changed"
  end

  def self.find_by_credentials!( user )
    @user = User.find_by_email!(user[:email])
    raise "Invalid Password" unless @user.has_password?(user[:password])

    @user
  end

  def reset_token!
    self.token = generate_token
    self.save! unless self.email.nil?
  end

  def generate_token
    SecureRandom.urlsafe_base64(16)
  end

  def password=(password)
    raise 'Password Cannot Be Blank' if password.nil?
    raise 'Password is too short' if password.length < 6
    self.pwd_hash = BCrypt::Password.create(password)
  end

  def has_password?(password)
    BCrypt::Password.new(self.pwd_hash).is_password?(password)
  end
end
