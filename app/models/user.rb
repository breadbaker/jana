class User < ActiveRecord::Base
  attr_accessible :email, :pwd_hash, :token, :password

	validates_presence_of :username, :email
  validates_uniqueness_of :username, :email

  def change_pass!(data)
    return unless data[:new].length > 0
    raise "Incorrect Password" unless self.has_password?(data[:password])

    if data[:new] != data[:confirm]
      raise 'Passwords do not match'
    end
    self.password= data[:new]

    return 'Password Changed'
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
