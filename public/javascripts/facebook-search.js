$(document).ready(function(){  
	
	$("#searching").hide();
	console.log("ready");

	$('#facebook-search-box').keyup(function(){

		console.log("searching facebook...");

		var searchTerm = $('#facebook-search-box').val();
		console.log('searchTerm: ' + searchTerm)

		$("#facebook-search-results > li").each(function() {
            if ($(this).text().search(searchTerm) > -1) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
	});
});