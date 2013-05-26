
/*
 * GET home page.
 */

 exports.index = function(req, res){

 	var displayName = '';
 	if (req.isAuthenticated() == true) {
 		console.log('user data: ' + req.user);
 		displayName = req.user.displayName;
 	}

 	res.render('index', { title: 'Track With Me.', isAuthenticated: req.isAuthenticated(), displayName: displayName });
 };