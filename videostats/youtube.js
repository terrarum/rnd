// YouTube Player Events.
var player;
function onYouTubeIframeAPIReady(playerId) {
    player = new YT.Player("myytplayer", {
        events: {
            'onReady': onReady,
            'onStateChange': onPlayerStateChange,
            'onError': onError
        }
    });
    console.log("youtube", player);
    player.hasBeenPlayed = false;
}

function onReady() {
    $('.yt-ready').html("Yes")
}

function onPlayerStateChange(state) {
    var message;
    var player = state.target;
    switch (state.data) {
        case -1:
            message = "Unstarted";
            break;
        case YT.PlayerState.ENDED:
            getPercentageViewed({}, false);
            message = "Ended";
            break;
        case YT.PlayerState.PLAYING:
            if (!player.hasBeenPlayed) {
                player.hasBeenPlayed = true;
                $('.yt-played').html("Yes");
            }
            getPercentageViewed(player, true);
            message = "Playing";
            break;
        case YT.PlayerState.PAUSED:
            getPercentageViewed({}, false);
            message = "Paused";
            break;
        case YT.PlayerState.BUFFERING:
            message = "Buffering";
            break;
        case YT.PlayerState.CUED:
            message = "Cued";
            break;
        default:

            break;
    }
    $('.yt-state').html(message)
}

function onError() {

}

var getPercentage;
function getPercentageViewed(player, start) {
    if (start) {
        var total = player.getDuration();
        var current;
        var percentage;
        getPercentage = setInterval(function() {
            current = Math.floor(player.getCurrentTime());
            percentage = current / total * 100;
            $('.yt-percent-watched').html(percentage.toFixed(2) + "%").append("<span> " + current + "s / " + total + "s</span>");
        }, 500);
    }
    else {
        clearInterval(getPercentage);
    }
}

(function($) {
    $(function() {
    //
    });
})(jQuery)