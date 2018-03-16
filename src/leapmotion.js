let isKeyTap = false;
let isCircle = false;
let isPinch = false;

const controller = new Leap.Controller({enableGestures: true});
controller.connect();

// Pour chaque frame
controller.on('frame', (frame) => {
	
	// Pour chaque main
	frame.hands.forEach( hand => {
		// Dessin de la paume
        let palmPos = getCoords(hand.palmPosition, frame);
        let leap = document.getElementById('leap');

        // Modifie la position du curseur pour celle de la paume
        leap.style.top = palmPos.y + "px";
        leap.style.left = palmPos.x + "px";   
        
        // Pour les gestes
        frame.gestures.forEach(gesture => {
            switch (gesture.type) {
                // Dans le cas du keyTape
                case 'keyTap' :
                    if(isKeyTap === false) {
                        isKeyTap = true;
                        onPadClick(thisPad);
                        // Permet d'éviter un déclenchement multiple
                        setTimeout(function(){ isKeyTap = false; }, 1000);
                        console.log(isKeyTap);
                    }
                    break;
                // Dans le cas du circle
                case 'circle' : 
                    if(gesture.progress >= 1) {
                        if(isCircle === false) {
                            isCircle = true;
                            if(play === false) {
                                onPlayClick();
                            } else {
                                onStopClick();
                                i = 60;
                            }
                            // Permet d'éviter un déclenchement multiple
                            setTimeout(function(){ isCircle = false; }, 1000);
                        }
                    }
                    break;
            }
        });

        if(hand.pinchStrength >= 0.9){
            if(isPinch === false) {
                isPinch = true;
                onSwitchClick(thisSwitch);
                // Permet d'éviter un déclenchement multiple
                setTimeout(function(){ isPinch = false; }, 1000);
            }
        }
    });
});

// Normalisation des points du leap
function getCoords(leapPoint, frame) {
    const iBox = frame.interactionBox;
    const normalizedPoint = iBox.normalizePoint(leapPoint, true);

    return {
        x : normalizedPoint[0] * window.innerWidth,
        y : (1 - normalizedPoint[1]) * window.innerHeight
    };
}