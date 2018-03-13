// Web Audio API

// Init et let
window.onload = init;
let ctx;
let bufferLoader;
let source1;
let source2;
let sources = []

function init() {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // Sound Container
    ctx = new AudioContext();

    // Charge les Sound
    bufferLoader = new BufferLoader( ctx,
    [
        // Tableau des Sound
        '/assets/closed_hat.wav',
        '/assets/kick.wav',
    ],
    finishedLoading
    );
    
    console.log("Tous les sons sont chargés");
    console.log(bufferLoader.bufferList);
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
    } else {
        console.warn('Aucune sources trouvées pour cet index');
    }
}

// Quand tous les Sound sont chargés
function finishedLoading(bufferList) {
    // Create two sources and play them both together.
    // Une Source par Sound
    source1 = ctx.createBufferSource();
    source2 = ctx.createBufferSource();
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[1];

    source1.connect(ctx.destination);
    source2.connect(ctx.destination);

    sources = [source1, source2];

    console.log("Tous les sons ont finit de charger");
    // playSounds();
}