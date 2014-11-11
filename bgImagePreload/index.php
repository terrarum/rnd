<!DOCTPYE html>
<html>
<head>
	<title>Background Image Preloader</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.4.1/build/cssreset/cssreset-min.css">
	<style type="text/css">
		#box1 {
			margin: 100px auto 10px auto;
			padding: 5px;
			width: 610px;
			height: 304px;
			border: 5px dashed black;
		}
		
		#box2 {
			padding: 10px;
			width: 45%;
			margin: auto;
			text-align: right;
			float: left;
		}
		
		#box3 {
			padding: 10px;
			width: 45%;
			margin: auto;
			text-align: left;
			float: right;
		}
	</style>
	
	<script type="text/javascript">
		
		var count = 0;
		var urls = [];
		var urlString = "";
		
		var img = new Image();
		$(img)
		.load(function() {
			console.log("done");
			backgrounds($(this).attr("src"));
			$("#box2").html("DONE");
		})
		.attr('src', 'http://chzgifs.files.wordpress.com/2012/02/funny-gifs-im-helping.gif');
		
		var img2 = new Image();
		$(img2)
		.load(function() {
			console.log("done");
			backgrounds($(this).attr("src"));
			$("#box3").html("DONE");
		})
		.attr('src', 'http://trrrm.com/lulz/hatersgonnahate.gif');
		
		function backgrounds(newUrl) {
			urls[count] = newUrl;
			console.log(urls);
			
			for (var i = 0; i < urls.length; i++) { 
				if (i == 0 && urls.length == 1) {
					urlString += "url('" + urls[i] + "')";
				}
				if (i == 1) {
					urlString += ", ";
					urlString += "url('" + urls[i] + "')";
				}
			}
			
			$("#box1").css("background", urlString);
			$("#box1").css("background-repeat", "no-repeat");
			$("#box1").css("background-position", "center left, center right");
			count++;
		}
		
	</script>
</head>
<body>
	<div id="box1"></div>
	<div id="box2">LOADING</div>
	<div id="box3">LOADING</div>
</body>
</html>