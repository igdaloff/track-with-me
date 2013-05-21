exports.callAjax = function(req, res){
	
	var jsonResponse = { result: 'working!', list: [ 'feeling', 'good', 'feeling', 'great' ] }
	console.log('jsonResponse: ' + jsonResponse);
	
	res.json(jsonResponse);
}
