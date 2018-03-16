let $track;
let trackInterval;
let play = false;
let thisPad;
let thisSwitch;
let i = 60;

$(function() {
	'use strict';

	// Stock une track
	$track = $('.track').first().clone(true);

	// Gestion de l'activation des pad (au click)
	$('.tracks-container').on('click', '.pad', onPadClick);
	// Gestion de l'activation des switch (au click)
	$('.tracks-container').on('click', '.switch', onSwitchClick);
	// Gestion de l'activation des controls (au click)
	$('.controls').on('click', '#play', onPlayClick);
	$('.controls').on('click', '#stop', onStopClick);

	// Génére les 11 autres tacks
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
	if (play == false) {
		// Permet d'éviter un déclenchement multiple
		trackInterval = window.setInterval(function(){ loader(); }, 30);
		play = true;
	}
}

function onStopClick() {
	if (play == true) {
		// Stop la tack-bar
		clearInterval(trackInterval);
		play = false;
	}else{
		// Réinitialise la track-bar
		i = 60;
		$('.track-bar').offset({
		    left : 60
		});
	}
}

// Gère l'activation d'un pad
function onPadClick() {	
	// Au Leap
	$(thisPad).toggleClass('pad-on');
	// A la souris
	$(this).toggleClass('pad-on');
}

// Gère l'activation d'un switch (et d'une piste)
function onSwitchClick() {
	// Au Leap
	$(thisSwitch).toggleClass('switch-on');

	if ($(thisSwitch).hasClass('switch-on') === true) {
		$(thisSwitch).parent().removeClass('track-disabled');
	} else {
		$(thisSwitch).parent().addClass('track-disabled');
	}

	// A la souris
	$(this).toggleClass('switch-on');

	if ($(this).hasClass('switch-on') === true) {
		$(this).parent().removeClass('track-disabled');
	} else {
		$(this).parent().addClass('track-disabled');
	}
}

function loader() {

	let globalCollision = false;

	// Vérifie la colision du track-bar avec les pad
	$('.pad-on').each(function() {
		if (collision($('.track-bar'), $(this)) === true) {
			globalCollision = true;
		}
	});

	// Donne le résulta de cette collision (True && False)
	$('#result').text(globalCollision);

	$('.track-bar').offset({
	    left : i
	});
	// Fait avancer le pad
    i += 7;
	if (i > window.innerWidth) {i = 60}
}

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

function padCollision() {
	let padLeapCollision = false;

	$('.pad').each(function() {
		if (collisionLeapPad($('#leap'), $(this)) === true) {
			padLeapCollision = true;
			console.log(padLeapCollision);
		}
	});
}

function collisionLeapPad($leap, $pad) {
	let x1 = $leap.offset().left;
	let y1 = $leap.offset().top;
	let h1 = $leap.outerHeight(true);
	let w1 = $leap.outerWidth(true);
	let b1 = y1 + h1;
	let r1 = x1 + w1;
	let x2 = $pad.offset().left;
	let y2 = $pad.offset().top;
	let h2 = $pad.outerHeight(true);
	let w2 = $pad.outerWidth(true);
	let b2 = y2 + h2;
	let r2 = x2 + w2;
	    
	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
		// Si pas de collision
		$pad.removeClass('pad-hover');
	}
	else{
		// Si collision
		$pad.addClass('pad-hover');
		thisPad = $pad;
	}
}

function switchCollision() {
	let switchLeapCollision = false;

	$('.switch').each(function() {
		if (collisionLeapSwitch($('#leap'), $(this)) === true) {
			switchLeapCollision = true;
			console.log(switchLeapCollision);
		}
	});
}

function collisionLeapSwitch($leap, $switch) {
	let x1 = $leap.offset().left;
	let y1 = $leap.offset().top;
	let h1 = $leap.outerHeight(true);
	let w1 = $leap.outerWidth(true);
	let b1 = y1 + h1;
	let r1 = x1 + w1;
	let x2 = $switch.offset().left;
	let y2 = $switch.offset().top;
	let h2 = $switch.outerHeight(true);
	let w2 = $switch.outerWidth(true);
	let b2 = y2 + h2;
	let r2 = x2 + w2;
	    
	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
		// Si pas de collision
		$switch.removeClass('switch-hover');
	}
	else{
		// Si collision
		$switch.addClass('switch-hover');
		thisSwitch = $switch;
	}
}

// Répète les function de collision
window.setInterval(function() {
	padCollision();
	switchCollision();
}, 10) 