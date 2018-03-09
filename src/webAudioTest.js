// Vérification si Web Audio API fonctionne
let context;

window.addEventListener('load', init, false);
function init() {
    try {
        //Fix up for prefixing
        window.AudioContext = window.AudioContext ||window.webkitAudioContext;
        context = new AudioContext();

        console.log("Web Audio API fonctionne");
    }
    catch(e) {
        alert('Web Audio API ne fonctionne pas sur ce navigateur');
    }
}