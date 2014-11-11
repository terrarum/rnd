(function($) {
    $(function() {
        // Detect device orientation.
        var screenOrientation;
        $(window).bind("load resize", function(){
            screenOrientation = ($(window).width() > $(window).height())? 'Landscape' : 'Portrait';

            $('.device').text(Detectizr.device.type);
            $('.has-touch').text(Modernizr.touch);
            $('.orientation').text(screenOrientation);
            $('.width').text($(window).innerWidth());
        });
    })
})(jQuery)
