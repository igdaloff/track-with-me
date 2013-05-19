var dates = []

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
	res.render('dates', {
		title: 'Dates',
		dates: dates
	});
}