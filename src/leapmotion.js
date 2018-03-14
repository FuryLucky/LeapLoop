const controller = new Leap.Controller({enableGestures: true});
controller.connect();

controller.on('frame', (frame) => {
	
	// Pour chaque main
	frame.hands.forEach( hand => {
		// Dessin de la paume
        let palmPos = getCoords(hand.palmPosition, frame);
        let leap = document.getElementById('leap');

        // console.log(leap.offsetTop);
        leap.style.top = palmPos.y + "px";
        leap.style.left = palmPos.x + "px";

        // console.log("Y = ", hand.palmPosition[1]);
        // console.log("X = ", hand.palmPosition[0]);
        
        frame.gestures.forEach(gesture => {
            switch (gesture.type) {
              case 'keyTap'    : console.info('KeyTap detected'); break;
            }
        });
    });
});

function getCoords(leapPoint, frame) {
    const iBox = frame.interactionBox;
    const normalizedPoint = iBox.normalizePoint(leapPoint, true);

    return {
        x : normalizedPoint[0] * window.innerWidth,
        y : (1 - normalizedPoint[1]) * window.innerHeight
    };
}