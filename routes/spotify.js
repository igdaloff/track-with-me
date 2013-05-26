var spotify = require('spotify')

exports.ajaxSearchTracks = function(req, res, next){
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