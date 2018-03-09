var $track;

$(function() {
	'use strict';

	$track = $('.track').first().clone(true);

	// Gestion de l'activation des pad (au click)
	$('.tracks-container').on('click', '.pad', onPadClick);
	$('.tracks-container').on('click', '.switch', onSwitchClick);

	initControlsListeners();
});

function initControlsListeners() {
	$('#track-add').on('click', onAddTrack);
}

// Ajoute un track à la liste
function onAddTrack() {
	// Pour cloner une ligne
	$track.clone(true).appendTo('.tracks-container');
}

// Gère l'activation d'un pad
function onPadClick(event) {
	event.preventDefault();

	$(this).toggleClass('pad-on');
}

// Gère l'activation d'un switch (et d'une piste)
function onSwitchClick(event) {
	event.preventDefault();

	$(this).toggleClass('switch-on');

	if ($(this).hasClass('switch-on') === true) {
		$(this).parent().removeClass('track-disabled')
	} else {
		$(this).parent().addClass('track-disabled')
	}
}



var i = 60;

function loader() {

	var globalCollision = false;

	$('.pad-on').each(function() {
		if (collision($('.track-bar'), $(this)) === true) {
			globalCollision = true;
		}
	});
	
	$('#result').text(globalCollision);

	$('.track-bar').offset({
	    left : i
	});
    i++;
    if (i == 1160) {i = 60}
}

window.setInterval(function(){ loader(); }, 1);


function collision($track, $pad) {
	var x1 = $track.offset().left;
	var y1 = $track.offset().top;
	var h1 = $track.outerHeight(true);
	var w1 = $track.outerWidth(true);
	var b1 = y1 + h1;
	var r1 = x1 + w1;
	var x2 = $pad.offset().left;
	var y2 = $pad.offset().top;
	var h2 = $pad.outerHeight(true);
	var w2 = $pad.outerWidth(true);
	var b2 = y2 + h2;
	var r2 = x2 + w2;
	    
	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
		$pad.css('border-color', 'black');
		return false;
	}
	else{
		$pad.css('border-color', 'red');
		return true;
	}
}