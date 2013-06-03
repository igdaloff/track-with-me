$(document).ready( function() {

	var mixDuration = 100000;

	$('#date-progress').animate({
	  width: '100%'
	}, mixDuration, 'linear');

	$('img.facebook-image').unveil(200);

	/* 	Sorta bastardizing Unveil (http://luis-almeida.github.io/unveil/), 
		but this will work for now.  Doesn't load image until you go into 
		the add-friends modal.  This is ugly, i'd like to get regular unveil 
		to work.

		It seems that the modal makes something get weird here, so I'm forcing
		the unveil event when the modal is opened.  This way, we're not loading
		images until the modal pops open.  Then it's still kinda hacky, though.
					                                                			*/

	$('a.add-friend').click(function(){
		$('img.facebook-image').trigger("unveil");
	})

	$('div.create-date-button').click(function(e){

		e.preventDefault();
		console.log("clicked create-date-button");
		// TODO - validate that everything is good
		var errorMessage = ''
		

		$('#date-form').submit();
	});

	
});

