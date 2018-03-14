const body = document.getElementsByTagName('body')[0];

const controller = new Leap.Controller({enableGestures: true});
controller.connect();

controller.on('frame', (frame) => {
	
	// Pour chaque main
	frame.hands.forEach( hand => {
		// Dessin de la paume
        let palmPos = getCoords(hand.palmPosition, frame, body);
        let leap = document.getElementById('leap');

        // console.log(leap.offsetTop);
        // leap.style.top = hand.palmPosition[1] + "px";
        leap.style.left = hand.palmPosition[0] + "px";
        
        if(hand.pinchStrength >= 0.8) {
            console.log("PINCH !!!");
        }
    });
});

function getCoords(leapPoint, frame, body) {
    const iBox = frame.interactionBox;
    const normalizedPoint = iBox.normalizePoint(leapPoint, true);

    return {
        x : normalizedPoint[0] * body.width,
        y : (1 - normalizedPoint[1]) * body.height
    };
}