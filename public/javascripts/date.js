$(document).ready( function() {

/*
	var mixDuration = 100000;

	$('#date-progress, #track-progress').animate({ //These will need to be separate when actually implemented
	  width: '100%'
	}, mixDuration, 'linear');
*/

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

	/* When the schedule date button is pressed, populate the form with the tracks
	   and friend.  Then we wait for the second create button to be clicked to set
	   date, time, and name, then submit the form 
	*/
	
	$('div.create-date-button').click(function(e){

		e.preventDefault();
		console.log("clicked create-date-button");
		// TODO - validate that everything is good
		var errorMessage = ''
		
		// set date, time, and title
		var date = $('li.set-date-row input').val();
		var time = $('li.set-time-row input').val();
		var name = $('li.set-name-row input').val();
		
		console.log("date: " + date + ", time: " + time + ", name: " + name);
		$('#date-form input#date-date').val(date);
		$('#date-form input#date-time').val(time);
		$('#date-form input#date-name').val(name);

		$('#date-form').submit();
	});


});

