module MicropostsHelper
	def user_timeline
		# binding.pry
		if session[:uid]
			res = conn.get do |req|
				req.url '/2/statuses/user_timeline.json'
				req.params['uid'] = session[:uid]
				req.params['access_token'] = session[:access_token]
	    	end
	    	@user_timeline = hashie res
	    end
	end
end