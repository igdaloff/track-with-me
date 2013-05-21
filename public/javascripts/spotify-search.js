$(document).ready(function(){  
	
	$("#searching").hide();

	$("#results-list").on("click", ">li", function(){

		console.log("click")
		var spotifyUri = $(this).attr('id');
		console.log('clicked on: ' + spotifyUri);

		var spotifyPlayIFrame = "<iframe src='https://embed.spotify.com/?uri=" 
			+ spotifyUri + "' width='300' height='380' frameborder='0' allowtransparency='true'></iframe>";

		$('#play-div').append(spotifyPlayIFrame);
	});

	$('#spotify-search-button').click(function(){

		var searchTerm = $('#spotify-search-term').val();
		console.log('searchTerm: ' + searchTerm)

		// clear any previous items
		$('#spotify-search-results').html('');

		$.ajax({
			type: "GET",
			url: "/spotifySearch",
			data: {
				"searchTerms" : searchTerm
			},
			dataType: "json",
			global: true

		}).done (function (data) {
			
			var tracks = data.tracks;

			console.log("returned " + tracks.length + " tracks");

			var htmlString = "<p>Results:</p><ul id='results-list'>";

			// tracks.forEach(function(track){
			for (var i = 0; i < tracks.length; i++) {
				track = tracks[i];
				htmlString += "<li id='" + track.href + "'>" + track.artists[0].name + " - " + track.name + "</li>";
			}
			
			$('#spotify-search-results').append(htmlString + '</ul>');
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