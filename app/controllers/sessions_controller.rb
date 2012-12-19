class SessionsController < ApplicationController
	def new

	end
	def create

    	authorize_url = "https://api.weibo.com/oauth2/authorize?client_id=274485643&response_type=code&redirect_uri=http://127.0.0.1/callback&forcelogin=true"
  		redirect_to authorize_url
	end

	def destroy
		session[:uid] = nil
		cookies.delete(:access_token)
		redirect_to root_url
	end

	def callback
	    # binding.pry
		mresp=conn.post '/oauth2/access_token',{:client_id => '274485643', :client_secret => 'b627824c0d800e238ad9088cd51d2390', :grant_type => 'authorization_code', :code => "#{params[:code].to_s}", :redirect_uri => 'http://127.0.0.1/callback'}
		# https://api.weibo.com/oauth2/access_token?client_id=274485643&client_secret=b627824c0d800e238ad9088cd51d2390&grant_type=authorization_code&redirect_uri=http://127.0.0.1/callback&code=
		mres = hashie mresp

		session[:uid] = mres.uid
		session[:access_token] = mres.access_token
		session[:expires_in] = mres.expires_in

		redirect_to '/'
	end

	def current_user
		res = conn.get do |req|
		  req.url '/2/users/show.json'
		  req.params['uid'] = session[:uid]
		  req.params['access_token'] = session[:access_token]
		end
		u = hashie res
	end
end
