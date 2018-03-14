// Web Audio API

// Init
window.onload = init;
window.SOUNDS = []

function init() {

    console.log('Loading...')

    let audioFileList = [
        // Tableau des Sound
        '/assets/closed_hat.wav',
        '/assets/kick.wav',
        '/assets/snare.wav',
    ];

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

    let index = $track.index() - 1; // -1 à cause de l'élément .track-bar qui se trouve aussi en tant que parent dans le tracks-container

    if (SOUNDS[index]) {

        if (SOUNDS[index].paused === true) {
            SOUNDS[index].currentTime = 0;
            SOUNDS[index].play();
        }
    } else {
        console.warn('Aucune sources trouvées pour cet index');
    }
}
