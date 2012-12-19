class PagesController < ApplicationController
  def index
    # binding.pry
  	if session[:uid]

      res = conn.get do |req|
        req.url '/2/statuses/friends_timeline.json'
        req.params['uid'] = session[:uid]
        req.params['access_token'] = session[:access_token]
      end
      @statuses = hashie res
  	end
  end

  def place
    res = conn.get do |req|
      req.url '/2/place/friends_timeline.json'
      req.params['access_token'] = session[:access_token]
    end
    @statuses = hashie res
  end

  def home
    if session[:uid]
      # binding.pry
      @followers = hashie friendships('followers.json',session[:uid],session[:access_token])

      @friends = hashie friendships('friends/bilateral.json',session[:uid], session[:access_token]) 
    end
  end

  def post
    conn.post '/2/statuses/update.json',{:status=> params[:post], :access_token=> session[:access_token]}
    redirect_to '/'
  end

  def login
    # binding.pry
  	# authorize_url = "https://api.weibo.com/oauth2/authorize?client_id=2763920762&response_type=code&redirect_uri=http://172.18.6.10/callback"
    authorize_url = "https://api.weibo.com/oauth2/authorize?client_id=274485643&response_type=code&redirect_uri=http://172.18.6.13/callback"
  	redirect_to authorize_url
  end

  def callback
     
    # mresp=conn.post '/oauth2/access_token',{:client_id => '2763920762', :client_secret => '5da01b9d615f0295cf49fcb70dffab2b', :grant_type => 'authorization_code', :code => "#{params[:code].to_s}", :redirect_uri => 'http://172.18.6.10/callback'}
    mresp=conn.post '/oauth2/access_token',{:client_id => '274485643', :client_secret => 'b627824c0d800e238ad9088cd51d2390', :grant_type => 'authorization_code', :code => "#{params[:code].to_s}", :redirect_uri => 'http://172.18.6.13/callback'}
    # https://api.weibo.com/oauth2/access_token?client_id=274485643&client_secret=b627824c0d800e238ad9088cd51d2390&grant_type=authorization_code&redirect_uri=http://172.18.6.13/callback&code=
    mres = hashie mresp
    
  	session[:uid] = mres.uid
  	session[:access_token] = mres.access_token
  	session[:expires_at] = mres.expires_at

    redirect_to '/'
  end

  protected


  def friendships(url,uid,access_token)
  	fs = conn.get do |req|
        req.url "/2/friendships/#{url}"
        req.params['uid'] = uid
        req.params['access_token'] = access_token
    end
  end
end
