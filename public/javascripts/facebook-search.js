$(document).ready(function(){  
	
	$('#facebook-search-box').keyup(function(){

		var searchTerm = $('#facebook-search-box').val();

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