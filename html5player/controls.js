var fastForwardRate = 3;
	
function play(target) {
	target.playbackRate = 1;
	target.play();
}

function pause(target) {
	target.pause();
}

function checkReadyState(target, playerId) {
	if (target.networkState >= 1 && target.readyState >= 2) {
		displayDuration(target, playerId);
		displayCurrentTime(target, playerId);
		updateLoadingBar(target, playerId);
		updateProgressBar(target, playerId);
	} else {
		jQuery("#duration").html("Loading...");
	}
}

function updateLoadingBar(target, playerId) {
	var loaded = target.buffered.end(target.buffered.length-1);
	var duration = target.duration;
	
	if (loaded <= duration) {
		var progress = loaded / duration * 100;
		var width = jQuery("#progressContainer" + playerId).width() * progress / 100;
		jQuery("#loadingBar" + playerId).css("width", width);
	} else if (loaded == duration) {
		clearInterval(loadingBarIntervalId);
	}
}

function updateProgressBar(target, targetId) {
	var progress = target.currentTime / target.duration * 100;
	var width = jQuery("#progressContainer" + targetId).width() * progress / 100;
	jQuery("#progressBar" + targetId).css("width", width);
}

function fastForward(target) {
	if (target.playbackRate == 1) {
		target.playbackRate = fastForwardRate;
	} else {
		target.playbackRate = 1;
	}
}

function displayCurrentTime(target, targetId) {
	var currentTime = target.currentTime;
	var currentMinutes = Math.floor(currentTime / 60);
	var currentSeconds = Math.floor(currentTime % 60);
	if (currentMinutes < 10) {
		currentMinutes = "0" + currentMinutes;
	}
	if (currentSeconds < 10) {
		currentSeconds = "0" + currentSeconds;
	}
	jQuery("#currentTime" + targetId).html(currentMinutes + ":" + currentSeconds);
}

function displayDuration(target, targetId) {
	var duration = target.duration;
	var durationMinutes = Math.floor(duration / 60);
	var durationSeconds = Math.floor(duration % 60);
	if (durationMinutes < 10) {
		durationMinutes = "0" + durationMinutes;
	}
	if (durationSeconds < 10) {
		durationSeconds = "0" + durationSeconds;
	}
	jQuery("#duration" + targetId).html(durationMinutes + ":" + durationSeconds);
}

jQuery(function() {
	jQuery(".progressContainer").click(function(e) {
		var target = document.getElementById(jQuery(this).parents("div:first").parents("div:first").attr("target"));
		var targetId = jQuery(this).parents("div:first").parents("div:first").attr("target"); console.log(targetId);
		var offset = jQuery("#progressContainer" + targetId).offset();
		var position = e.pageX - offset.left;
		var goTo = position / jQuery("#progressContainer" + targetId).width() * target.duration;
		target.currentTime = goTo;
	});
	
	$('.player').each(function(index) {
		var playerId = jQuery(this).attr("id");
		var target = document.getElementById(playerId);
		setInterval(function() {checkReadyState(target, playerId);}, 100);
	});
	
	jQuery(".beginning").click(function() {
		var target = document.getElementById(jQuery(this).parents("div:first").attr("target"));
		target.currentTime = 0;
		target.playbackRate = 1.0;
		pause(target);
	});

	jQuery(".stepBack").click(function() {
		var target = document.getElementById(jQuery(this).parents("div:first").attr("target"));
		target.currentTime -= 10;
	});
	
	jQuery(".playPause").click(function() {
		var target = document.getElementById(jQuery(this).parents("div:first").attr("target"));
		var targetId = jQuery(this).parents("div:first").attr("target");
		if (target.paused == true) {
			jQuery(this).html("| |");
			play(target);
		} else if (target.paused == false) {
			jQuery(this).html(">");
			pause(target);
		}
	});

	jQuery(".stepForward").click(function() {
		var target = document.getElementById(jQuery(this).parents("div:first").attr("target"));
		target.currentTime += 10;
	});

	jQuery(".fastForward").click(function() {
		var target = document.getElementById(jQuery(this).parents("div:first").attr("target"));
		fastForward(target);
	});

	jQuery(".fullscreen").click(function() {
		var target = document.getElementById(jQuery(this).parents("div:first").attr("target"));
		target.webkitEnterFullScreen();
	});
});