<html>
<head>
	<meta charset="utf-8">
	<title>Box2D</title>
	<script src="box2d.js"></script>
</head>
<body>

	<canvas id="c" width="800" height="600" style="border: 1px solid black"></canvas>

	<script>
		
		var keysDown = [];
		
		keysDown['left'] = false;
		keysDown['right'] = false;
		keysDown['up'] = false;
		
		window.requestAnimFrame = (function() {
			return	window.requestAnimationFrame		|| 
				window.webkitRequestAnimationFrame	|| 
				window.mozRequestAnimationFrame		|| 
				window.oRequestAnimationFrame		|| 
				window.msRequestAnimationFrame		|| 
				function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
		})();
				
		var b2Vec2 = Box2D.Common.Math.b2Vec2,
		b2BodyDef = Box2D.Dynamics.b2BodyDef,
		b2Body = Box2D.Dynamics.b2Body,
		b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
		b2Fixture = Box2D.Dynamics.b2Fixture,
		b2World = Box2D.Dynamics.b2World,
		b2MassData = Box2D.Collision.Shapes.b2MassData,
		b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
		b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
		b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
		b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;
		b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

		var canvas = document.getElementById("c");
		var ctx = canvas.getContext("2d");

		var world = new b2World(
			new b2Vec2(0, 0),	//gravity
			true				//allow sleep
		);

		var SCALE = 30;
		
		function drawWalls() {
			var ceilingFix = new b2FixtureDef;
			ceilingFix.friction = 1;
			ceilingFix.restitution = 0.2;
			ceilingFix.shape = new b2PolygonShape;
			ceilingFix.shape.SetAsBox((800 / SCALE) / 2, (10 / SCALE) / 2);

			var ceilingDef = new b2BodyDef;
			ceilingDef.type = b2Body.b2_staticBody;
			ceilingDef.position.x = (800 / 2) / SCALE;
			ceilingDef.position.y = 0 / SCALE;

			var groundFix = new b2FixtureDef;
			groundFix.friction = 4;
			groundFix.restitution = 0.2;
			groundFix.shape = new b2PolygonShape;
			groundFix.shape.SetAsBox((1200 / SCALE) / 2, (10 / SCALE) / 2);

			var groundDef = new b2BodyDef;
			groundDef.type = b2Body.b2_staticBody;
			groundDef.position.x = canvas.width / 2 / SCALE;
			groundDef.position.y = canvas.height / SCALE;

			var wallFix = new b2FixtureDef;
			wallFix.friction = 1;
			wallFix.restitution = 0.2;
			wallFix.shape = new b2PolygonShape;
			wallFix.shape.SetAsBox((10 / SCALE) / 2, (600 / SCALE) / 2);
			
			var leftWall = new b2BodyDef;
			leftWall.type = b2Body.b2_staticBody;
			leftWall.position.x = 0 / SCALE;
			leftWall.position.y = (600 / 2) / SCALE;

			var rightWall = new b2BodyDef;
			rightWall.type = b2Body.b2_staticBody;
			rightWall.position.x = 800 / SCALE;
			rightWall.position.y = (600 / 2) / SCALE;

			world.CreateBody(ceilingDef).CreateFixture(ceilingFix);
			world.CreateBody(groundDef).CreateFixture(groundFix);
			world.CreateBody(leftWall).CreateFixture(wallFix);
			world.CreateBody(rightWall).CreateFixture(wallFix);
		}
		
		function createPlayer() {
			
			var worldAxis = new b2Vec2(1.0, 0.0);
			
			var playerDef = new b2BodyDef;
			var playerFix = new b2FixtureDef;
			playerDef.type = b2Body.b2_dynamicBody;
			playerDef.position.x = 100 / SCALE;
			playerDef.position.y = 100 / SCALE;
			playerDef.bullet = true;
			playerFix.density = 1.0;
			playerFix.friction = 1;
			playerFix.restitution = 0.2;
			playerFix.shape = new b2PolygonShape();
			playerFix.shape.SetAsBox(20 / SCALE, 5 / SCALE);
			
			var headDef = new b2BodyDef;
			var headFix = new b2FixtureDef;
			headDef.type = b2Body.b2_dynamicBody;
			headDef.position.x = playerDef.position.x + 30 / SCALE;
			headDef.position.y = playerDef.position.y;
			headFix.density = 0.7;
			headFix.friction = 1;
			headFix.restitution = 0.2;
			headFix.shape = new b2CircleShape(8 / SCALE);
			
			var legDef = new b2BodyDef;
			var legFix = new b2FixtureDef;
			legDef.type = b2Body.b2_dynamicBody;
			legDef.position.x = playerDef.position.x - 25 / SCALE;
			legDef.position.y = playerDef.position.y - 5 / SCALE;
			legDef.bullet = true;
			legFix.density = 1.0;
			legFix.friction = 1;
			legFix.restitution = 0.2;
			legFix.shape = new b2PolygonShape();
			legFix.shape.SetAsBox(15 / SCALE, 2.5 / SCALE);
			
			var leftLeg = world.CreateBody(legDef);
			leftLeg.CreateFixture(legFix);
			
			var head = world.CreateBody(headDef);
			head.CreateFixture(headFix);
			
			var body = world.CreateBody(playerDef);
			body.CreateFixture(playerFix);
			
			var weldJointDef = new b2WeldJointDef();
			weldJointDef.Initialize(body, head, body.GetWorldCenter());
			
			var leftLegJoint = new b2RevoluteJointDef();
			leftLegJoint.Initialize(leftLeg, body, new b2Vec2(3.3, 3.3), new b2Vec2(2, 2));
			leftLegJoint.maxMotorTorque = 1.0;
			leftLegJoint.enableMotor = true;
			 
			world.CreateJoint(leftLegJoint);
 
			world.CreateJoint(leftLegJoint);
			world.CreateJoint(weldJointDef);
		}

		function init() {
			drawWalls();
			
//			var bodyDef = new b2BodyDef;
//			bodyDef.type = b2Body.b2_staticBody;
//
//			// positions the center of the object (not upper left!)
//			bodyDef.position.x = 600 / 2 / SCALE;
//			bodyDef.position.y = 800 / SCALE;
//			
//			var fixDef = new b2FixtureDef;
//			fixDef.density = 1.0;
//			fixDef.friction = 0.5;
//			fixDef.restitution = 0.2;
//			
//			bodyDef.type = b2Body.b2_dynamicBody;
//			for(var i = 0; i < 5; ++i) {
//					fixDef.shape = new b2CircleShape(
//						Math.random() + 0.1 //radius
//					);
//				bodyDef.position.x = Math.random() * 25;
//				bodyDef.position.y = Math.random() * 10;
//				world.CreateBody(bodyDef).CreateFixture(fixDef);
//			}

			createPlayer();
			
			//setup debug draw
			var debugDraw = new b2DebugDraw();
			debugDraw.SetSprite(document.getElementById("c").getContext("2d"));
			debugDraw.SetDrawScale(SCALE);
			debugDraw.SetFillAlpha(0.3);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			world.SetDebugDraw(debugDraw);
		}; // init()

		function update() {
			var b2Vec2 = Box2D.Common.Math.b2Vec2
			
			var turnSpeed = 1;
			var maxTurnSpeed = 30;
			
			var thrust = 6;
			var maxThrust = 20;
			
			var player = world.m_bodyList;
			
			if (keysDown['right'] && player.m_angularVelocity < maxTurnSpeed) {
				player.ApplyTorque(turnSpeed);
			}
			else if (keysDown['left'] && player.m_angularVelocity > -maxTurnSpeed) {
				player.ApplyTorque(-turnSpeed);
			}
			
			if (keysDown['up']) {
				var angle = player.GetAngle();
				player.ApplyForce(new b2Vec2(
						Math.cos(angle) * thrust,
						Math.sin(angle) * thrust
					),
					player.GetWorldCenter()
				);
			}	
		
			world.Step(
				1 / 60,		//frame-rate
				10,			//velocity iterations
				10			//position iterations
			);
			world.DrawDebugData();
			world.ClearForces();

			requestAnimFrame(update);
		}; // update()

		init();
		requestAnimFrame(update);
		
						
			console.log(world);
		
		document.onkeyup = function(event) {
			var keyCode; 
 
			if (event == null) {
				keyCode = window.event.keyCode; 
			}
			else {
				keyCode = event.which;
			}
			
			if (keyCode == 38) {
				keysDown['up'] = false;
			}
			
			if (keyCode != 38) {
				keysDown['left'] = false;
				keysDown['right'] = false;
			}
		}
		
		document.onkeydown = function(event) {
			var keyCode; 
 
			if (event == null) {
				keyCode = window.event.keyCode; 
			}
			else {
				keyCode = event.which; 
			}
 
			switch(keyCode) {
				// left 
				case 37:
					// action when pressing left key
					keysDown['left'] = true;
					keysDown['right'] = false;
					break;

				// up 
				case 38:
					// action when pressing up key
					keysDown['up'] = true;
					break; 

				// right 
				case 39:
					// action when pressing right key
					keysDown['left'] = false;
					keysDown['right'] = true;
					break; 

				// down
				case 40:
					// action when pressing down key
					break; 

				default: 
					break; 
			} 
		}

	</script>
	<br>
	Left = Rotate left<br>
	Right = Rotate right<br>
	Up = Jump
</body>
</html>