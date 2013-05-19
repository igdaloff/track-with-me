var dates = []
var Date = require('../models/Date');
var path = require('path');
var fs = require('fs');
var join = path.join;

dates.push( {
	title: 'An Evening In Missoula',
	friend: 'Erica Ermann',
	song1: 'Daft Punk - Human After All',
	song2: 'Dale Earnhardt Jr. Jr. - Nothing But Our Love',
	song3: 'Moby - God Moving Over The Face Of The Water'
});

dates.push( {
	title: 'Let\'s Listen to Music!',
	friend: 'Erica Ermann',
	song1: 'Radiohead - Lotus Flower'
});

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
	res.render('dates/create', {
		title: 'Track With Me!'	
	});
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