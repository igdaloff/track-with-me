$(document).ready(function(){

	$('.nav-login-link').click( function() {

		var loginContainer = $('#login');
		var headerHeight = $('header').outerHeight();

		if ( $(loginContainer).hasClass('login-hidden') ){
			$(loginContainer).css('top', headerHeight);
		} else {
			$(loginContainer).css('top', '-5px');
		}

		$(loginContainer).toggleClass('login-hidden');

		event.preventDefault();

	});

});