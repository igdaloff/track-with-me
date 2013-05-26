var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/track_with_me');

var schema = new mongoose.Schema({
	displayName: String,
	facebookId: String,
	picture: String,
	accessToken: String
})

module.exports = mongoose.model('User', schema);