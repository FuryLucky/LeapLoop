let $track;
let trackInterval;

function getCoords(leapPoint, frame, body) {
    const iBox = frame.interactionBox;
    const normalizedPoint = iBox.normalizePoint(leapPoint, true);

    return {
        x : normalizedPoint[0] * body.width,
        y : (1 - normalizedPoint[1]) * body.height
    };
}

$(function() {
	'use strict';

	$track = $('.track').first().clone(true);

	// Gestion de l'activation des pad (au click)
	$('.tracks-container').on('click', '.pad', onPadClick);
	$('.tracks-container').on('click', '.switch', onSwitchClick);
	$('.controls').on('click', '#play', onPlayClick);
	$('.controls').on('click', '#stop', onStopClick);

	// initControlsListeners();
	for (let i = 0; i < 11; i++) {
		onAddTrack()
	}
});

// Ajoute un track à la liste
function onAddTrack() {
	// Pour cloner une ligne
	$track.clone(true).appendTo('.tracks-container');
}

function onPlayClick() {
	trackInterval = window.setInterval(function(){ loader(); }, 1);
}

function onStopClick() {
	clearInterval(trackInterval);
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
		$(this).parent().removeClass('track-disabled');
	} else {
		$(this).parent().addClass('track-disabled');
	}
}

let i = 75;

function loader() {

	let globalCollision = false;

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
    if (i == 1310) {i = 60}
}

// window.setInterval(function(){ loader(); }, 1);


function collision($trackBar, $pad) {
	let x1 = $trackBar.offset().left;
	let y1 = $trackBar.offset().top;
	let h1 = $trackBar.outerHeight(true);
	let w1 = $trackBar.outerWidth(true);
	let b1 = y1 + h1;
	let r1 = x1 + w1;
	let x2 = $pad.offset().left;
	let y2 = $pad.offset().top;
	let h2 = $pad.outerHeight(true);
	let w2 = $pad.outerWidth(true);
	let b2 = y2 + h2;
	let r2 = x2 + w2;
	    
	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
		$pad.removeClass('pad-play');
		return false;
	}
	else{
		$pad.addClass('pad-play');
		playSound($pad);
		return true;
	}
}