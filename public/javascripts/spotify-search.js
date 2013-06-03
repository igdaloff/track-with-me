var songIndex = 0;

$(document).ready(function(){  
	
	$("#searching").hide();

	$(document.body).on("click", "ul#results-list li", function(){

		console.log("click")
		var spotifyUri = $(this).attr('id');
		console.log('clicked on: ' + spotifyUri);

		songIndex++;

		if (songIndex > 3) {
			alert("You've already selected 3 songs.");
		} else {
		
			// set the proper song field
			$('input#date-song' + songIndex).val(spotifyUri);
		}
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