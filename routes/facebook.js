var facebook = require('../modules/facebook.js');

exports.search = function(req, res, next){

	// We want to get all friends via /me/friends
	facebook.getFbData(req.user.accessToken, '/me/friends', function(data){
		
		var friendsJson = JSON.parse(data);

		var friendsArray = friendsJson.data

		// sort friends data
		friendsArray.sort(function(a, b){
			if (a.name < b.name) {
				return -1;
			} else if (a.name > b.name) {
				return 1;
			}
			return 0;
		});

		res.render('facebook/search', {
			title: 'Search Facebook',
			friends: friendsArray,
			isAuthenticated: req.isAuthenticated()
		});
	});
}