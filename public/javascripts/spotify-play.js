

$(document).ready(function(){  
	console.log("Document ready!");
	
	$("p").click(function(){
		console.log("click")
		var spotifyUri = $(this).attr('id');
		console.log('clicked on: ' + spotifyUri);

		var spotifyPlayIFrame = "<iframe src='https://embed.spotify.com/?uri=" 
			+ spotifyUri + "' width='300' height='380' frameborder='0' allowtransparency='true'></iframe>";

		$('#play-div').append(spotifyPlayIFrame);
	});
});

console.log("loaded spotify-play.js");
