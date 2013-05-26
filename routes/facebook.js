var Facebook = require('facebook-node-sdk');

// this is simply to clean up the configuration, and 
// keep it all within the app.js file
exports.Facebook = Facebook;

exports.ajaxSearchFriends = function (req, res, next) {
	console.log("searching for friend");

	var searchTerm = req.query.searchTerm;
	console.log("access_token: " + req.user.accessToken);

	var queryString = '/search?q=' + searchTerm + '&type=user&access_token=' + req.user.accessToken;

	console.log('full query: ' + queryString);

	/* https://graph.facebook.com/search?q=mark&type=user */
	req.facebook.api(queryString, function(err, data) {
		if(err) {
			console.log("error searching for Facebook Friends: " + err);
		 	return next(err);
		}
		res.json(data);

	});
}

exports.search = function(req, res, next){

	// We want to get all friends via /me/friends
	var friendsRequestUrl = '/me/friends?access_token=' + req.user.accessToken;
	console.log("get friends: " + friendsRequestUrl);
	req.facebook.api(friendsRequestUrl , function(err, data){

		if (err) {
			console.log("Error retrieving friends: " + err);
			return next(err);
		}

		console.log("friends: " + data);

		res.render('facebook/search', {
			title: 'Search Facebook',
			friends: data,
			isAuthenticated: req.isAuthenticated()
		});
	});
}

exports.loginRequired = Facebook.loginRequired;