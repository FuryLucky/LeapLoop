// Web Audio API

// Init
window.onload = init;
// Tableau de tous les sons
window.SOUNDS = []

function init() {

    console.log('Loading...');

    // Tableau SOUNDS
    let audioFileList = [
        '/assets/kick.wav',
        '/assets/snare.wav',
        '/assets/hat.wav',
        '/assets/bass.wav',
        '/assets/bell.wav',
        '/assets/biz.wav',
        '/assets/guitarde.wav',
        '/assets/harp.wav',
        '/assets/piano.wav',
        '/assets/plucked.wav',
        '/assets/synth.wav',
        '/assets/heavy_synth.wav'
    ];

    // Création des balises audio
    audioFileList.forEach(soundPath => {
        let a = new Audio(soundPath);
        SOUNDS.push(a);
    });
}

// Joue les Sounds on click sur le bouton
function playSound($pad) {

    let $track = $pad.parents('.track');

    if ($track.hasClass('track-disabled') === true) {
        return;
    }

    // Récupère le son qui correspond à cette même ligne
    let index = $track.index() - 1; // -1 à cause de l'élément .track-bar qui se trouve aussi en tant que parent dans le tracks-container

    if (SOUNDS[index]) {
        if (SOUNDS[index].paused === true) {
            SOUNDS[index].currentTime = 0;
            SOUNDS[index].play();
        }
    } else {
        // Si aucun son ne correspond à cette ligne
        console.warn('Aucune sources trouvées pour cet index');
    }
}
