class UserMailer < ActionMailer::Base
  default from: "welcome@janas-art.herokuapp.com"

  def confirmation_email(user)
    @user = user
    @url = 'http://janabaker.us/confirm'
    mail( to: user.email, subject: 'Confirm Your Account')
  end

end
