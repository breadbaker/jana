class UserMailer < ActionMailer::Base
  default from: "welcome@janabaker.us"
  
  def confirmation_email(user)
    @user = user
    @url = 'http://janabaker.us/confirm'
    mail( to: user.email, subject: 'Confirm Your Account')
  end
  
end
