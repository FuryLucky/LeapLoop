const canvas = document.getElementsByTagName('canvas')[0];
const canvas_context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const controller = new Leap.Controller();
controller.connect();

controller.on('frame', (frame) => {
	
	// Efface le canvas
	canvas_context.clearRect(0, 0, canvas.width, canvas.height);
	
	// Pour chaque main
	frame.hands.forEach( hand => {
		// Dessin de la paume
        let palmPos = getCoords(hand.palmPosition, frame, canvas);
        canvas_context.beginPath();
        canvas_context.arc(palmPos.x, palmPos.y, 15, 0, 2 * Math.PI);
        canvas_context.fillStyle = "red";
        canvas_context.fill();
        canvas_context.stroke();
		
	});
	
});

function getCoords(leapPoint, frame, canvas) {
    const iBox = frame.interactionBox;
    const normalizedPoint = iBox.normalizePoint(leapPoint, true);

    return {
        x : normalizedPoint[0] * canvas.width,
        y : (1 - normalizedPoint[1]) * canvas.height
    };
}