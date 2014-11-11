var BCL = {};
// Event listener for the player being ready.
BCL.onTemplateReady = function (event) {
    BCL.player = brightcove.api.getExperience("brightcove-pod-object");
    // Get a reference to the video player.
    BCL.videoPlayer = BCL.player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
    // Load the video

    $('.bc-ready').html("Yes");
    BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.BEGIN, bcBeginHandler);
    BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, bcCompleteHandler);
    BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.ERROR, bcErrorHandler);
    BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY, bcPlayHandler);
    BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PROGRESS, bcProgressHandler);
    BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.STOP, bcStopHandler);
}

function bcBeginHandler(e) {
    BCL.videoPlayer.getCurrentVideo(function(e){
        $('.bc-played').html("Yes");
        ga('send', 'event', {
            eventCategory: 'test-article',
            eventAction: e.id,
            eventLabel: 'bbb',
            eventValue: 111
        })
    })

    //_trackEvent('test-article', '013256', 1111, 'NP', 'u4');
}

//Event label: [article category]|[article ID]|[video ID]|[video title]|[preroll boolean]-[label indicating band into which video length falls, e.g. u1, u2, u3, u4, u5, 5+, where u1 = 'under 1 minute' etc]
//putting-technique|12345|66uyguu6612|putting-for-left-handers|NP|u4

function bcCompleteHandler(e) {
    $('.bc-percent-watched').html(e.position / e.duration * 100)
}

function bcErrorHandler(e) {

}

function bcPlayHandler(e) {
    $('.bc-state').html('Playing');
}

function bcProgressHandler(e) {
    var percentage = e.position / e.duration * 100;
    $('.bc-percent-watched').html(percentage.toFixed(2) + "%")
}

function bcStopHandler(e) {
    $('.bc-state').html('Stopped');
}

$(function() {

})