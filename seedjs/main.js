$(function() {
    var seed;
    var gen;

    var randgen = function() {
        $('.js-clear').html('');
        seed = $('.js-seed').val();
        $('.js-seed-out').html(seed);

        gen = new Math.seedrandom(seed);

        $('.js-output').html('');

        var sources = [
            {
                name: 'stars',
                gen: null
            },
            {
                name: 'circles',
                gen: null
            },
            {
                name: 'other',
                gen: null
            }
        ]
        var r;

        // Build a generator for each source.
        _.forEach(sources, function(source, key) {
            r = gen();
            $('.js-output-init').append("Generator " + (key + 1) + ": " + r + '<br/>');
            source.gen = new Math.seedrandom(r);
        });

        // Run generator for each source.
        var runs = 20;
        _.forEach(sources, function(source, key) {
            _.times(runs, function(n) {
                $('.js-output-' + key).append(source.gen() + "<br/>");
            })
        });


    }

    // Debounce seed entry.
    $('.js-seed').on('keyup', _.debounce(randgen, 250));

    // Start page with content.
    $('.js-seed').val('seed string');
    randgen();
})