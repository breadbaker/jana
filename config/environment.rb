# Load the rails application
require File.expand_path('../application', __FILE__)


# Initialize the rails application
Jana::Application.initialize!




ActionMailer::Base.perform_deliveries = true
ActionMailer::Base.raise_delivery_errors = true
ActionMailer::Base.default_url_options = { :host => 'www.janabaker.us' }
ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
    :enable_starttls_auto => true,
    :address => "smtp.gmail.com",
    :port => 587,
    :domain => "gmail.com",
    :authentication => :login,
    :user_name => ENV['GMAIL_USER'],
    :password => ENV['GMAIL_PASSWORD']
}