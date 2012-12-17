module SessionsHelper
	def current_user
		res = conn.get do |req|
		  req.url '/2/users/show.json'
		  req.params['uid'] = session[:uid]
		  req.params['access_token'] = session[:access_token]
		end
		@current_user = hashie res
	end
	
	def signed_in?
	  !session[:uid].nil?
	end
=begin

	def sign_in
	  # binding.pry
	  authorize_url = "https://api.weibo.com/oauth2/authorize?client_id=274485643&response_type=code&redirect_uri=http://172.18.6.13/callback"
	  redirect_to authorize_url
	end



	def current_user=(user)
		@current_user = user
	end


	def current_user?(user)
	  user == current_user
	end

	def signed_in?
	  !current_user.nil?
	end

	def sign_out
		# binding.pry
		self.current_user = nil
		cookies.delete(:remember_token)

	end

	def redirect_back_or(default)
	  redirect_to(session[:return_to] || default)
	  session.delete(:return_to)
	end

	def store_location
	  session[:return_to] = request.url
	end

	def signed_in_user
	  unless signed_in?
	    store_location
	    redirect_to signin_url, notice: "Please sign in."
	  end
	end
=end
	
end
