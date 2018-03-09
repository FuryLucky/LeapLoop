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