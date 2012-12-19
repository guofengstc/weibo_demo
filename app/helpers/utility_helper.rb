module UtilityHelper
	def conn
		conn = Faraday.new(:url => api_base_url) do |faraday|
			faraday.request :url_encoded
			faraday.response :logger
			faraday.adapter Faraday.default_adapter
		end
	end

	def hashie(response)
		# binding.pry
		json_body = JSON.parse(response.body)
		if json_body.is_a? Array
			Array.new(json_body.count){|i| Hashie::Mash.new(json_body[i])}
		else
			Hashie::Mash.new json_body
		end
	end
	def api_base_url
		"https://api.weibo.com"
	end
	def weibo_base_url
		"http://weibo.com/"
	end
end