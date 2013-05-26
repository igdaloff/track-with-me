$(document).ready(function(){  
	
	$("#searching").hide();
	console.log("ready");

	$('#facebook-search-button').click(function(){

		console.log("searching facebook...");

		var searchTerm = $('#facebook-search-term').val();
		console.log('searchTerm: ' + searchTerm)

		// clear any previous items
		$('#facebook-search-results').html('');

		$.ajax({
			type: "GET",
			url: "/facebookSearch",
			data: {
				"searchTerm" : searchTerm
			},
			dataType: "json",
			global: true

		}).done (function (data) {
			
			var users = data.users;

			console.log("returned " + users.length + " users");

			var htmlString = "<p>Results:</p><ul id='results-list'>";

			// tracks.forEach(function(track){
			for (var i = 0; i < tracks.length; i++) {
				user = users[i];
				htmlString += "<li id='" + user.id + "'>" + user.name + "</li>";
			}
			
			$('#facebook-search-results').append(htmlString + '</ul>');
		});
	});
});

$(document).ajaxStart(function() {
	console.log("ajaxSend");
	$("#searching").show();
});

$(document).ajaxStop(function() {
	console.log("ajaxComplete");
	$("#searching").hide();
});