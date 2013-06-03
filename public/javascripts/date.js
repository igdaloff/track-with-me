$(document).ready( function() {

	var mixDuration = 100000;

	$('#date-progress').animate({
	  width: '100%'
	}, mixDuration, 'linear');

	$('img.facebook-image').unveil();

	/* 	Sorta bastardizing Unveil (http://luis-almeida.github.io/unveil/), 
		but this will work for now.  Doesn't load image until you go into 
		the add-friends modal.  This is ugly, i'd like to get regular unveil 
		to work...                                                   			*/

	$('a.add-friend').click(function(){
		$('img.facebook-image').trigger("unveil");
	})

	
});

