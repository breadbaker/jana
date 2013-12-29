class UserMailer < ActionMailer::Base
  default from: "welcome@janabaker.us"

  def confirmation_email(user)
    @user = user
    @url = 'http://janabaker.us/confirm'
    mail( to: user.email, subject: 'Confirm Your Account')
  end

  def recover_email(user)
    @user = user
    mail( to: user.email, subject: 'Reset Password')
  end

  def tell_dan(user)
    @user= user
    mail( to: 'danielebaker@gmail.com', subject: 'New User')
  end

end
