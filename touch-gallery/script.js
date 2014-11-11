(function($) {
    $(function() {
        $('.gallery-item').not('.is-top').velocity({
            translateX: $(this).width() / 2
        }, {
            duration: 0
        });

        var startX = null;
        var deltaX = null;
        var finalX = null;
        var currentX = null;
        var itemStartX = null;
        var slidePercent = null;

        var allowSlide = true;

        var slideMax = 0.05;

        // Gallery item sliding.
        $('.js-item').on({
            'touchstart': function(ev) {
                $(this).addClass('is-active');
                startX = ev.originalEvent.touches[0].clientX;
                itemStartX = $(this).position().left;
            },
            'touchmove': function(ev) {
                if (allowSlide) {
                    slide($(this), ev);
                }
                else {
                    slideReset($(this));
                }
            },
            'touchend': function() {
                $(this).removeClass('is-active');

                startX = null;
                deltaX = null;
                finalX = null;
                currentX = null;
                itemStartX = null;
                slidePercent = null;
            }
        })

        // Controls the gallery item sliding.
        function slide($item, ev) {
            currentX = ev.originalEvent.touches[0].clientX;
            deltaX = currentX - startX;
            finalX = itemStartX + deltaX;
            slidePercent = finalX / $item.width();

            // Snap back to center if near center.
            if (slidePercent > -0.02 && slidePercent < 0.02) {
                finalX = 0;
                $item.velocity({
                    translateX: 0
                }, {
                    duration: 100
                });
            }
            // Move to given position.
            else {
                $item.velocity({
                    translateX: finalX
                }, {
                    duration: 0
                });
            }

            // Controls the slide.
            // Swiping left.
            if (slidePercent < -slideMax) {
                allowSlide = false;
                if ($item.hasClass('js-item-last')) {
                    $item.velocity({
                        translateX: 0
                    }, {
                        duration: 500,
                        complete: function(){
                            allowSlide = true;
                        }
                    });
                }
                else {
                    $itemNext = $('.js-item.is-next');

                    // Slide selected slide.
                    $item.velocity({
                        translateX: -$item.width()
                    }, {
                        duration: 1000,
                        complete: function(){
                            allowSlide = true;
                            updateSlideStack('next');
                        }
                    });

                    // Slide in next slide.
                    $itemNext.velocity({
                        translateX: 0
                    }, {
                        duration: 1000
                    });
                }
            }
            // Swiping right.
            else if (slidePercent > slideMax) {
                allowSlide = false;
                if ($item.hasClass('js-item-1')) {
                    $item.velocity({
                        translateX: 0
                    }, {
                        duration: 500,
                        complete: function(){
                            allowSlide = true;
                        }
                    });
                }
                else {

                    $itemPrev = $('.js-item.is-prev');

                    // Slide selected slide.
                    $item.velocity({
                        translateX: $item.width() / 2
                    }, {
                        duration: 1000,
                        complete: function(){
                            allowSlide = true;
                            updateSlideStack('prev');
                        }
                    });

                    // Slide in next slide.
                    $itemPrev.velocity({
                        translateX: 0
                    }, {
                        duration: 1000
                    })

                }
            }
        }

        function slideReset($item) {
            // Slide selected slide.
//                    $item.css({
//                        background: 'red',
//                        left: '0px'
//                    })
        }

        // Update the class names for the stack of slides.
        function updateSlideStack(dir) {
            switch(dir) {
                case 'next':
                    var next = 0;
                    var nextChanged = false;
                    var topChanged = false;
                    var prevChanged = false;
                    $('.js-item').each(function(i, el) {

                        // Remove 'is-prev' from last slide.
                        if ($(el).hasClass('is-prev') && !prevChanged) {
                            $(el).removeClass('is-prev');
                            prevChanged = true;
                        }
                        else if ($(el).hasClass('is-top') && !topChanged) {
                            $(el).removeClass('is-top').addClass('is-prev');
                            topChanged = true;
                        }
                        else if ($(el).hasClass('is-next') && !nextChanged) {
                            $(el).removeClass('is-next').addClass('is-top');
                            next = i + 1;
                            nextChanged = true;
                        }
                    });

                    if (next > $('.js-item').length - 1) {
//                        next = 0;
                    }

                    $($('.js-item')[next]).addClass('is-next');

                    break;
                case 'prev':
                    var prev = 0;
                    var nextChanged = false;
                    var topChanged = false;
                    var prevChanged = false;
                    $('.js-item').each(function(i, el) {

                        if ($(el).hasClass('is-next') && !nextChanged) {
                            $(el).removeClass('is-next');
                            nextChanged = true;
                        }
                        else if ($(el).hasClass('is-top') && !topChanged) {
                            $(el).removeClass('is-top').addClass('is-next');
                            topChanged = true;
                        }
                        else if ($(el).hasClass('is-prev') && !prevChanged) {
                            $(el).removeClass('is-prev').addClass('is-top');
                            prev = i - 1;
                            prevChanged = true;
                        }
                    });

                    if (prev < 0) {
//                        prev = $('.js-item').length - 1;
                    }

                    $($('.js-item')[prev]).addClass('is-prev');
                    break;
                default:

            }
        }

        // Sidebar toggle.
        $('.js-sidebar-toggle').on('click', function() {
            console.log($(this).hasClass('is-active'))
            if ($(this).hasClass('is-active')) {
                $('.js-sidebar').velocity({
                    left: '-320px'
                },{
                    duration: '400'
                })
                $(this).removeClass('is-active');
            }
            else {
                $('.js-sidebar').velocity({
                    left: '0px'
                },{
                    duration: '400'
                })
                $(this).addClass('is-active');
            }
        });
    })
})(jQuery)