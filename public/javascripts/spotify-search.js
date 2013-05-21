$(document).ready(function(){  
	$('#ajax-button').click(function(){
		$.ajax({
			type: "GET",
			url: "/ajaxTest",
			dataType: "json"
		}).done (function (data) {
			$('#ajax-div').append('<p>' + data.result + '<p>');
		});
	});
});