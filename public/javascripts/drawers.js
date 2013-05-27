//NAVIGATION SLIDING DRAWERS

$(document).ready( function() {

	$('.nav-link').click( function() {

		var headerHeight = $('header').outerHeight();
		var drawer = $(this).attr('href');
		var drawerOther = $(this).parents('li').siblings('li').children('.nav-link').attr('href');
		var drawerHeightNegative = ($(drawer).outerHeight())*-3;

		if ( $(drawer).hasClass('drawer-hidden') ){
			$(drawer).css('top', headerHeight);
			$(drawer).addClass('drawer-active');
		} else {
			$(drawer).css('top', drawerHeightNegative);
			$(drawer).removeClass('drawer-active');
		}

		//If the other drawer is open, close it when opening the other one
		if ( $(drawerOther).hasClass('drawer-active') ){
			$(drawerOther).addClass('drawer-hidden');
			$(drawerOther).css('top', drawerHeightNegative);
			$(drawerOther).removeClass('drawer-active');
		}

		$(drawer).toggleClass('drawer-hidden');

		event.preventDefault();
	});

	$(window).resize( function() {
		var headerHeight = $('header').outerHeight();

		$('.drawer-active').css('top', headerHeight);
	});

});

