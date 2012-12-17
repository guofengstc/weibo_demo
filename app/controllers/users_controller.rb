class UsersController < ApplicationController
	def show
		res = conn.get do |req|
		  req.url '/2/users/show.json'
		  req.params['uid'] = session[:uid]
		  req.params['access_token'] = session[:access_token]
		end
		u = hashie res
	end
end