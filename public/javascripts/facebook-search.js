$(document).ready(function(){  
	
	$('#facebook-search-box').keyup(function(){

		var searchTerm = $('#facebook-search-box').val();

		// let's make the search smarter...
		// break down search terms into individual items:
		var searchTermArray = searchTerm.split(' ');

		$("#facebook-search-results > li").each(function() {

			var stringToCheck = $(this).text().toLowerCase();

			if (containsAll(stringToCheck, searchTermArray, 0)) {

				$(this).show();
			}
			else {
				$(this).hide();
			}
		});
	});

	$(document.body).on("click", "ul#facebook-search-results li", function(){

		var friendName = $(this).text();
		var fbData = $(this).attr('id');

		var fbDataArray = fbData.split(' ');

		var fbID = fbDataArray[0];
		var fbUsername = fbDataArray[1];

		// add ?type=large to the end if we want a larger image
		var imageUrl = 'https://graph.facebook.com/' + fbUsername + '/picture?type=large'

		$('p#friend-name').text(friendName);
		$('img.friend-user-image').attr('src', imageUrl)
		
		// TODO - fill this in for some hidden form so that we can just use a form submit
		$('input#friend-for-date').text(fbID);

		// TODO - navigate to '#!' so modal will automagically close
		// Not sure that this is the best way - seems hacky
		window.location.href = '#!';
		
	});
});

// recursive, motherfucker.
function containsAll(stringToCheck, arrayOfTerms, i){

	var termToCheck = arrayOfTerms[i].toLowerCase();

	if (i == arrayOfTerms.length - 1) {
		return stringToCheck.search(termToCheck) > -1

	} else {
		return stringToCheck.search(termToCheck) > -1 && containsAll(stringToCheck, arrayOfTerms, i+1);
	}
}