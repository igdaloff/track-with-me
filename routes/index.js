
/*
 * GET home page.
 */

 exports.index = function(req, res){

 	if (req.isAuthenticated() == true) {
 		console.log("user: " + req.user);
 	}
 	
 	res.render('index', { title: 'Track With Me.', isAuthenticated: req.isAuthenticated() });
 };