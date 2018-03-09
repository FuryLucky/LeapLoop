// Web Audio API

// Init et let
window.onload = init;
let context;
let bufferLoader;
let source1;
let source2;

function init() {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // Sound Container
    context = new AudioContext();

    // Charge les Sound
    bufferLoader = new BufferLoader( context,
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
function playSounds() {
    $('#play').on('click', function() {
        source1.start();
        source2.start();
    })
}

// Quand tous les Sound sont chargés
function finishedLoading(bufferList) {
    // Create two sources and play them both together.
    // Une Source par Sound
    source1 = context.createBufferSource();
    source2 = context.createBufferSource();
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[1];

    source1.connect(context.destination);
    source2.connect(context.destination);
    playSounds();
}