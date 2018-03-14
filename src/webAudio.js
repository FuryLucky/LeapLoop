// Web Audio API

// Init et let
window.onload = init;
let audioCtx;
let bufferLoader;
let source1;
let source2;
let sources = []

function init() {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // Sound Container
    audioCtx = new AudioContext();
    // let gainNode = audioCtx.createGain();
    // gainNode.gain.value = 0;

    // Charge les Sound
    bufferLoader = new BufferLoader( audioCtx,
    [
        // Tableau des Sound
        '/assets/closed_hat.wav',
        '/assets/kick.wav',
        '/assets/snare.wav',
    ],
    finishedLoading
    );
    
    bufferLoader.load();
}

// Joue les Sounds on click sur le bouton
function playSound($pad) {

    let $track = $pad.parents('.track');

    if ($track.hasClass('track-disabled') === true) {
        return;
    }

    let index = $track.index() - 1; // -1 à cause de l'élément .track-bar qui se trouve aussi en tant que parent dans le tracks-container

    console.log('source n°', index, 'chargées');

    if (sources[index]) {
        console.log(sources[index])
        sources[index].start();
        sources[index].addEventListener('ended',function(){
            console.log("Fin du son");
        });
    } else {
        console.warn('Aucune sources trouvées pour cet index');
    }
}

// Quand tous les Sound sont chargés
function finishedLoading(bufferList) {
    // Create two sources and play them both together.
    // Une Source par Sound
    source1 = audioCtx.createBufferSource();
    source2 = audioCtx.createBufferSource();
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[1];

    source1.connect(audioCtx.destination);
    source2.connect(audioCtx.destination);

    // source1.loop = true;
    // source2.loop = true;

    source1.start();
    source2.start();

    sources = [source1, source2];

    console.log(sources);

    console.log("Tous les sons ont finit de charger");
}