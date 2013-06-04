var spotify = require('spotify')
var mock = false;

/*
var libspotify = require('libspotify');
var session = new libspotify.Session({
    applicationKey: __dirname + '/../auth/spotify_appkey.key'
});

session.login('', '');
*/

exports.ajaxSearchTracks = function(req, res, next){
	console.log("in spotify search submit");
	var searchKeyword = req.query.searchTerms
	console.log("search keyword: " + searchKeyword);

	/* I had to create this for working without an internet connection (i.e. on a plane) */
	if (mock) {
		var mockData = { tracks: [ 
			{ 	href: 'id_1', 
				name: 'My Pal Foot Foot', 
				artists: [ {name: 'The Shaggs'}]
			}, {
				href: 'id_2', 
				name: 'The World', 
				artists: [ {name: 'The Shaggs'}]
			}]
		};

		res.json(mockData)
	
	} else {
	
		/*
		var search = libspotify.Search('track:' + searchKeyword);
		search.trackCount = 25;
		search.execute();
		search.once('ready', function(){
			res.json(search.tracks)
		})
		*/
		
		spotify.search({ type: 'track', query: searchKeyword }, function(err, data) {

			if(err) return next(err);

			res.json(data);
			
		});	
		
	}
}

exports.search = function(req, res){
	res.render('spotify/search', {
		title: 'Search Spotify',
		isAuthenticated: req.isAuthenticated()	
	});
}