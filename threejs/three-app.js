var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
var zoom = 500;
// var camera = new THREE.OrthographicCamera(window.innerWidth / -zoom, window.innerWidth / zoom,
// 	window.innerHeight / zoom, window.innerHeight / -zoom, -500, 1000 );
camera.position.z = 2;

var projector = new THREE.Projector();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting.
var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

var anchorYMax = 0.4
var createAnchor = function() {
	var geometry = new THREE.CubeGeometry(0, 0, 0);
	var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
	var anchor = new THREE.Mesh( geometry, material );
	scene.add(anchor);
	anchor.position.y = anchorYMax;
	return anchor;
}
// Anchors.
var anchor = createAnchor();
var anchorNo = createAnchor();
var anchorYes = createAnchor();

anchorNo.position.x = -1.5;
anchorYes.position.x = 1.5;

cardsMain = [];
cardsNo = [];
cardsYes = [];

// Card builder.
var cards = [];
var cardMaker = function(front, back) {
	var cardMaterials = [
	   new THREE.MeshBasicMaterial({color: 0x999999}),	// right
	   new THREE.MeshBasicMaterial({color: 0x999999}),	// left
	   new THREE.MeshBasicMaterial({color: 0x999999}),	// top?
	   new THREE.MeshBasicMaterial({color: 0x999999}),	// bottom?
	   new THREE.MeshBasicMaterial({
	       map: THREE.ImageUtils.loadTexture(front)		// front
	   }),
	   new THREE.MeshBasicMaterial({
	       map: THREE.ImageUtils.loadTexture(back)		// back
	   })
	];

	var card = new THREE.Mesh(
	    new THREE.CubeGeometry(1.5, 1, .1),
	    new THREE.MeshFaceMaterial(cardMaterials)
	);

	card.shouldSpin = false;
	card.anchor = anchor;

	scene.add(card);
	return card;
};

var header = function() {
	var headerMaterials = [
	   new THREE.MeshBasicMaterial({color: 0x999999}),	// right
	   new THREE.MeshBasicMaterial({color: 0x999999}),	// left
	   new THREE.MeshBasicMaterial(),					// top?
	   new THREE.MeshBasicMaterial(),					// bottom?
	   new THREE.MeshBasicMaterial({
	       map: THREE.ImageUtils.loadTexture('assets/header.png')		// front
	   }),
	   new THREE.MeshBasicMaterial()
	];

	var header = new THREE.Mesh(
	    new THREE.CubeGeometry(4, 0.5, 0),
	    new THREE.MeshFaceMaterial(headerMaterials)
	);

	header.position.y = 1.15;
	header.position.z = 0.2;
	scene.add(header);
}
header();

cards.push(cardMaker('assets/anstey-hall.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/barnston-lodge.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/blenheim-palace.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/boxted-hall.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/cambridge-union-society.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/even-after.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/fidler-manor.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/flitwick-manor.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/freeman-castle.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/gibbings-residence.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/holmewood-hall.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/khan-palace.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/kimbolton-castle.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/prested-hall.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/reed-hall.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/robinson-seat_s1.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/something-house.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/stationers-hall.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/vegas-castle.jpg', 'assets/dates.jpg'));
cards.push(cardMaker('assets/west-heath.jpg', 'assets/dates.jpg'));

var height = 1.05;
var sideHeight = height / 2;

document.addEventListener('touchstart', onTouchStart, false);
document.addEventListener('touchend', onTouchEnd, false);
document.addEventListener('touchmove', onTouchMove, false);

var initialTouchX = null;
var initialTouchY = null;
var initialAnchorX = null;
var initialAnchorY = null;
var initialAnchorNoX = null;
var initialAnchorNoY = null;
var initialAnchorYesX = null;
var initialAnchorYesY = null;
var canFlip = true;
function onTouchStart(e) {
	e.preventDefault();
	touch = e.changedTouches[0];

	currentCard = getTouchTarget(e.changedTouches[0]);

	initialTouchX = touch.clientX;
	initialTouchY = touch.clientY;
	initialAnchorX = anchor.position.x;
	initialAnchorY = anchor.position.y;
	initialAnchorNoX = anchorNo.position.x;
	initialAnchorNoY = anchorNo.position.y;
	initialAnchorYesX = anchorYes.position.x;
	initialAnchorYesY = anchorYes.position.y;
}

var currentCard = null;

var swipeDir = null;
var swipeRangeH = 15;
var swipeRangeV = 10;
var horzRange = 0.1;
function onTouchMove(e) {
	e.preventDefault();
	
	var touch = e.changedTouches[0];
	
	var distX = initialTouchX - touch.clientX;
	var distY = initialTouchY - touch.clientY;

	if (typeof swipeDir !== 'string') {
		if (distX >= swipeRangeH || distX <= -swipeRangeH) {
			swipeDir = 'horz';
		}
		else if (distY >= swipeRangeV || distY <= -swipeRangeV) {
			swipeDir = 'vert';
		}
		else {
			swipeDir = null;
		}
	}

	if (distY != 0 || distX != 0) {
		canFlip = false;
	}

	// If swipe is vertical:
	// Scroll lists, with constraints based on number of cards in list.
	if (swipeDir == 'vert') {
		if (touch.clientX >= 200 && touch.clientX <= 824) {
			anchor.position.y = initialAnchorY + distY / 250;
			if (anchor.position.y <= anchorYMax) {
				anchor.position.y = anchorYMax;
			}
			else if (anchor.position.y >= cardsMain.length * height - height * 2) {
				anchor.position.y = cardsMain.length * height - height * 2;
			}
		}
		else if (touch.clientX < 200) {
			anchorNo.position.y = initialAnchorNoY + distY / 250;
			if (anchorNo.position.y <= anchorYMax) {
				anchorNo.position.y = anchorYMax;
			}
			else if (anchorNo.position.y >= cardsNo.length * sideHeight - sideHeight * 2) {
				anchorNo.position.y = cardsNo.length * sideHeight - sideHeight * 2;
			}
		}
		else if (touch.clientX > 824) {
			anchorYes.position.y = initialAnchorYesY + distY / 250;
			if (anchorYes.position.y <= anchorYMax) {
				anchorYes.position.y = anchorYMax;
			}
			else if (anchorYes.position.y >= cardsYes.length * sideHeight - sideHeight * 2) {
				anchorYes.position.y = cardsYes.length * sideHeight - sideHeight * 2;
			}
		}
	}
	// If swipe is horizontal:
	// Move selected card to the column in the direction of the swipe.
	else if (swipeDir == 'horz') {
		var newPos = initialAnchorX - distX / 250;
		currentCard.object.position.x = newPos;

		// No column.
		if (newPos <= -horzRange) {
			currentCard.object.anchor = anchorNo;
			currentCard.object.position.x = anchorNo.position.x;
			currentCard.object.scale.set(0.35, 0.5, 0.5);
		}
		// Yes column.
		else if (newPos >= horzRange) {
			currentCard.object.anchor = anchorYes;
			currentCard.object.position.x = anchorYes.position.x;
			currentCard.object.scale.set(0.35, 0.5, 0.5);
		}
	}
}

function onTouchEnd(e) {
	e.preventDefault();

	if (canFlip) {		
		currentCard.object.shouldSpin = true;	
	}
	canFlip = true;
	swipeDir = null;
	initialAnchorY = anchor.position.y;
	currentCard = null;
}


// Click detection for a Perspective camera.
var getTouchTarget = function(touch) {
	event.preventDefault();

	var vector = new THREE.Vector3((touch.clientX / window.innerWidth) * 2 - 1, - (touch.clientY / window.innerHeight) * 2 + 1, 0.5);
	projector.unprojectVector(vector, camera);

	var raycaster = new THREE.Raycaster(camera.position, vector.sub( camera.position ).normalize());

	var intersects = raycaster.intersectObjects(cards);
	return intersects[0];
}

// Click detection for an Orthographic camera.
// var getTouchTarget = function(touch) {
// 	var vector = new THREE.Vector3((touch.clientX / window.innerWidth) * 2 - 1,
//     -(touch.clientY / window.innerHeight) * 2 + 1,
//     0.5);
// 	var ray = projector.pickingRay(vector, camera);

// 	var intersects = ray.intersectObjects(cards);
// 	return intersects[0];
// }

var spinRate = 0.1;

function render() {
	requestAnimationFrame(render);

	// Rotate cards if necessary.
	for (var i in cards) {
		if (cards[i].shouldSpin) {

			if (cards[i].rotation.y >= 0 && cards[i].rotation.y < Math.PI) {
				cards[i].rotation.y += spinRate;
				if (cards[i].rotation.y >= Math.PI) {
					cards[i].rotation.y = Math.PI;
					cards[i].shouldSpin = false;
				}
			}
			else if (cards[i].rotation.y >= Math.PI) {
				cards[i].rotation.y += spinRate;
				if (cards[i].rotation.y >= 2 * Math.PI) {
					cards[i].rotation.y = 0;
					cards[i].shouldSpin = false;
				}
			}
		}
	}
	renderer.render(scene, camera);

	// Loop through cards, ensure they are positioned relative to anchor.
	cardsMain = [];
	cardsNo = [];
	cardsYes = [];

	var incNo = 0;
	var incYes = 0;
	var incMain = 0;
	for (var i in cards) {
		// Main column.
		if (cards[i].anchor == anchor) {
			cardsMain.push(cards[i]);
			cards[i].position.y = cards[i].anchor.position.y - height * incMain;
			incMain++;
		}
		// No column.
		if (cards[i].anchor == anchorNo) {
			cardsNo.push(cards[i]);
			cards[i].position.y = cards[i].anchor.position.y - sideHeight * incNo;
			cards[i].rotation.y = 0.7
			incNo++;
		}
		// Yes column.
		if (cards[i].anchor == anchorYes) {
			cardsYes.push(cards[i]);
			cards[i].position.y = cards[i].anchor.position.y - sideHeight * incYes;
			cards[i].rotation.y = -0.7
			incYes++;
		}
	}
}
render();