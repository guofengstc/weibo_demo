module UsersHelper
	def counts
		if session[:uid]
			# binding.pry
			res = conn.get do |req|
				req.url '/2/users/counts.json'
				req.params['uids'] = session[:uid]
				req.params['access_token'] = session[:access_token]
	    	end
	    	@counts = hashie res
		end
	end
	def testPrint
		puts "fafdsfsdfsdfsdf"
	end
end