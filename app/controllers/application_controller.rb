class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper
  include MicropostsHelper
  include UtilityHelper
  # require 'hashie'
  # require 'json'
  # require 'faraday'
end
