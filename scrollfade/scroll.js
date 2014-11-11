$(function() {
    // Hide all the images.
    $('section img').each(function() {
        $(this).css('display', 'none');
    })

    // Call checkVisible.
    checkVisible();
    // Call checkVisible every time the page is scrolled.
    $(window).scroll(function() {
        checkVisible();
    })

    // Checks if every image is on screen, fades it in if it is visible and has finished downloading.
    function checkVisible() {
        $('.img').each(function() {
            if ($(this).visible(false, true)) {
                $(this).waitForImages(function() {
                    $(this).children('img').fadeIn(1500);
                })
            }
        })
    }
})
