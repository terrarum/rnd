<html>
<head>
	<title>Box Height</title>
	<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.4.1/build/cssreset/cssreset-min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script type="text/javascript">
		$(function() {
			var highestCol = Math.max($('#box1').height(),$('#box2').height(),$('#box3').height());
			$('.box').height(highestCol);
		})
	</script>
	<style>
		#content {
			border: 1px dashed red;
			height: 100%;
		}
		
		#boxes {
			width: 1000px;
			border: 1px solid black;
			margin: auto;
			overflow: hidden;
		}
		
		.box {
			float: left;
			width: 300px;
			margin: 9px;
			position: relative;
			padding: 5px;
			background-color: khaki;
		}
	</style>
</head>
<body>
	<div id="content">
		<div id="boxes">
			<div class="box" id="box1">Yo! I got a little dog the doggy's name is Doggy Fresh and out of every single dog I've ever met, he's the best and the rest of the dogs in the world, I wouldn't own 'em yo my moms tried to clone him -- I got sewn in his skin a little microchip so he could be a cyborg -- wanna get him equipped with a GPS and the 802.11b so he could hit me up on IRC when he gotta go out and pee and not just stand by the door and whine wish he'd grow an opposable thumb sometimes yo but I don't mind it gets me out and about it's good to walk around the block, remind the dog he ain't allowed to eat no street chicken, and chase no squirrels just to keep on kicking with a tail that curls just to keep on fancy stepping with the ears that flop just to rock, yes, Doggy Fresh you don't stop.</div>
			<div class="box" id="box2">Yo! I got a little dog the doggy's name is Doggy Fresh and out of every single dog I've ever met, he's the best and the rest of the dogs in the world, I wouldn't own 'em yo my moms tried to clone him -- I got sewn in his skin a little microchip so he could be a cyborg -- wanna get him equipped with a GPS and the 802.11b so he could hit me up on IRC when he gotta go out and pee and not just stand by the door and whine wish he'd grow an opposable thumb sometimes yo but I don't mind it gets me out and about it's good to walk around the block, remind the dog he ain't allowed to eat no street chicken, and chase no squirrels just to keep on kicking with a tail that curls just to keep on fancy stepping with the ears that flop just to rock, yes, Doggy Fresh you don't stop. I got a little dog the doggy's name is Doggy Fresh and he be crazy charismatic like David Koresh you can try to stay pissed about the fur on your clothes but look out you 'bout to giggle when he lick on your nose call and he shows up fast, he throws up grass, if you got a nice carpet he be dragging his ass and he don't like baths, and he barks at intruders, he be begging where the food is like his owner was the cruelest non-dog-food-purchasing dog owner ever he occasionally ekes out a treat through this endeavor but you got to forgive him with his big brown eyes you got to go on to admit my dog's incredibly fly he 'bout as fierce as a wolf, 'bout as big as a fox if he drops one beat I'ma knock 'em out the box yo your cat's name may be Maceo but my dog is Doggy Fresh and Doggy Fresh is good to go!</div>
			<div class="box" id="box3">Hello.</div>
		</div>
	</div>
</body>
</html>