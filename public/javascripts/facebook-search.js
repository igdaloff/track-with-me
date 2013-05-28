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