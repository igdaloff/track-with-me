var spotify = require('spotify')

exports.ajaxSearch = function(req, res, next){
	console.log("in spotify search submit");
	var searchKeyword = req.query.searchTerms
	console.log("search keyword: " + searchKeyword);

	spotify.search({ type: 'track', query: searchKeyword }, function(err, data) {

		if(err) return next(err);

		res.json(data);
	});	
}

exports.search = function(req, res){
	res.render('spotify/search', {
		title: 'Search Spotify'	
	});
}

exports.submit = function(req, res, next) {

	console.log("in spotify search submit");
	var searchKeyword = req.body.spotify.keyword;
	console.log("search keyword: " + searchKeyword);

	spotify.search({ type: 'track', query: searchKeyword }, function(err, data) {

		console.log("in spotify search");
		console.log("Error: " + err);
		if(err) return next(err);
		
		var tracks = data.tracks;
		tracks.forEach(function(track) {
			console.log("track: " + track.name);
			console.log("artist: " + track.artists[0].name)
		});
		res.render('spotify/results', { title: "Results for '" + searchKeyword + "'", songData: tracks });
	});	
}

// This is here for no reason.  Need to figure out correct way to do this
exports.results = function(req, res, next) {
	res.render('spotify/results');
}