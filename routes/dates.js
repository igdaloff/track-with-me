var Date = require('../models/Date');
var path = require('path');
var fs = require('fs');
var facebook = require('../modules/facebook.js');
var join = path.join;

var mock = false;

exports.list = function(req, res){
	Date.find({}, function(err, dates){
		if (err) return next(err);

		res.render('dates', {
			title: 'Dates',
			dates: dates
		});
	})
}

exports.form = function(req, res){

	if (mock) {

		var friendsArray =  [{name: 'Erica Ermann'}, {name: 'Jon Solove'}, {name: 'Nathan Igdaloff'}]
		res.render('dates/create', {
			friends: friendsArray,
			isAuthenticated: req.isAuthenticated()
		});

	} else {

		// preload the facebook friends (via /me/friends)
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

			res.render('dates/create', {
				friends: friendsArray,
				isAuthenticated: req.isAuthenticated()
			});
		});
	}
}

exports.submit = function (dir) {
	return function(req, res, next) {

		var name = req.body.date.name;
		var date = req.body.date.date;
		var friend = req.body.date.friend;
		var song1 = req.body.date.song1;
		var song2 = req.body.date.song2;
		var song3 = req.body.date.song3;


		Date.create({
			name: name,
			date: date,
			friend: friend,
			song1: song1,
			song2: song2,
			song3: song3
		}, function (err) {
			if (err) return next(err);
			res.redirect('/dates');
		});
	}
}