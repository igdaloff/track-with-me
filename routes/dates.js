var Date = require('../models/Date');
var path = require('path');
var fs = require('fs');
var facebook = require('../modules/facebook.js');
var join = path.join;

var mock = false;

exports.list = function(req, res){
	Date.find({
		
		$or:[
        		{ user: req.user.facebookId },
				{ friend: req.user.facebookId }
			]
		
	}, function(err, dates){
		if (err) return next(err);
		
		var datesData = [];
		
		// iterate over dates
		for(var i in dates) {

			var date = dates[i];
		
			/* 
				We need to turn the 'friend' and 'user' id into a human readable name. 
				
				This is using wrapping because it has to.  Look up wrapping if you want
				to learn more...it's annoying as shit.
				
			*/
			(function(date){
				
				facebook.getFbData(req.user.accessToken, '/' + date.user, function(user){
			
					var userJson = JSON.parse(user);
				
					facebook.getFbData(req.user.accessToken, '/' + date.friend, function(friend){
					
						var friendJson = JSON.parse(friend);
	
						datesData.push({
							"user" : userJson.name,
							"friend" : friendJson.name,
							"date" : date.date,
							"name" : date.title,
							"id" : date._id
						});
						
						if (datesData.length == dates.length) {
							renderDates(res, req, datesData)
						}	
					});
				});	
				
			})(date);
		}		
	});
}

function renderDates(res, req, datesData) {
	res.render('dates', {
		title: 'My Dates',
		dates: datesData,
		isAuthenticated: req.isAuthenticated()
	});
}

exports.form = function(req, res){

	if (mock) {

		var friendsArray =  [
		
		{	id: '123123', 
			name: 'Erica Ermann', 
			username: 'ericaermann', 
			picture: 
			{ 	data: { 
					url: 'images/erica-profile.jpg'
				}
			}
		}, 
		{	id: '123456', 
			name: 'Jon Solove', 
			username: 'jon.solove', 
			picture: 
			{ 	data: { 
				url: 'images/jon-profile.jpg'
			}
			}
			
		}]
		
		res.render('dates/create', {
			friends: friendsArray,
			isAuthenticated: req.isAuthenticated()
		});

	} else {
		
		// preload the facebook friends (via /me/friends)
		facebook.getFbData(req.user.accessToken, '/me/friends?fields=id,name,username,picture', function(data){
			
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
				currentUserImage: req.user.picture,
				friends: friendsArray,
				isAuthenticated: req.isAuthenticated()
			});
		});
	}
}

exports.cold = function(req, res, next) {
	res.render('dates/cold', {
		title: 'Date',
		isAuthenticated: req.isAuthenticated()
	});
}

exports.date = function (req, res, next) {
	
	console.log("req.query.id: " + req.query.id);
	
	Date.findOne({_id: req.query.id}, function(err, date){
		if (err) return next(err);

		res.render('dates/date', {
			title: 'Date',
			date: date,
			isAuthenticated: req.isAuthenticated()
		});
	});
}

exports.submit = function (req, res, next) {


	console.log("called submit");

	console.log("request: " + req.body);

	var name = req.body.date.name;
	var date = req.body.date.date;
	var time = req.body.date.time;
	var friend = req.body.date.friend;
	var song1 = req.body.date.song1;
	var song2 = req.body.date.song2;
	var song3 = req.body.date.song3;

	console.log("friend: " + friend);

	Date.create({
		user: req.user.facebookId,
		title: name,
		date: date + ' ' + time,
		friend: friend,
		song1: song1,
		song2: song2,
		song3: song3
	}, function (err) {
		if (err) return next(err);
		res.redirect('/');
	});
}