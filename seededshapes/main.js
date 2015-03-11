var canvas,
    ctx,
    canvasWidth = 800,
    canvasHeight = 600;

var setColor = function(rP, gP, bP) {
    var r = parseInt(255 * rP);
    var g = parseInt(255 * gP);
    var b = parseInt(255 * bP);
    ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
}

var drawPoint = function(xP, yP) {
    var size = 20;
    var x = canvasWidth * xP;
    var y = canvasHeight * yP;
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
}

var drawLine = function(x1P, y1P, x2P, y2P) {
    var x1 = canvasWidth * x1P;
    var y1 = canvasHeight * y1P;
    var x2 = canvasWidth * x2P;
    var y2 = canvasHeight * y2P;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

var drawCircle = function(xP, yP) {
    var x1 = canvasWidth * xP;
    var y1 = canvasHeight * yP;
    var r = 20;
    ctx.beginPath();
    ctx.arc(x1, y1, r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.stroke();
}

$(function() {
    var seed;
    var gen;

    canvas = document.getElementsByClassName('js-canvas')[0];
    ctx = canvas.getContext('2d');

    var randgen = function() {
        $('.js-clear').html('');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        seed = $('.js-seed').val();
        $('.js-seed-out').html(seed);

        gen = new Math.seedrandom(seed);

        $('.js-output').html('');

        var sources = [
            {
                name: 'points',
                gen: null
            },
            {
                name: 'lines',
                gen: null
            },
            {
                name: 'circles',
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

        var color = [];
        var points = [];
        var lines = [];
        var circles = [];

        // Run generator for each source.
        var runs = 20;
        var rn;
        _.forEach(sources, function(source, key) {
            _.times(runs, function(n) {
                rn = source.gen();
                $('.js-output-' + key).append(rn + "<br/>");

                switch(color.length) {
                    case 0:
                    case 1:
                        color.push(rn);
                        break;
                    case 2:
                        color.push(rn);
                        setColor(color[0], color[1], color[2]);
                        color = [];
                        break;
                }

                // Render each source's things.
                switch(source.name) {

                    // Draw Points.
                    case "points":
                        switch(points.length) {
                            case 0:
                                points.push(rn);
                                break;
                            case 1:
                                points.push(rn);
                                drawPoint(points[0], points[1]);
                                points = [];
                                break;
                        }
                        break;

                    // Draw Lines.
                    case "lines":
                        switch(lines.length) {
                            case 0:
                            case 1:
                            case 2:
                                lines.push(rn);
                                break;
                            case 3:
                                lines.push(rn);
                                drawLine(lines[0], lines[1], lines[2], lines[3]);
                                lines = [];
                                break;
                        }
                        break;

                    // Draw Lines.
                    case "circles":
                        switch(circles.length) {
                            case 0:
                            case 1:
                                circles.push(rn);
                                break;
                            case 2:
                                circles.push(rn);
                                drawCircle(circles[0], circles[1], circles[2]);
                                circles = [];
                                break;
                        }
                        break;
                }
            })
        });


    }

    // Debounce seed entry.
    $('.js-seed').on('keyup', _.debounce(randgen, 250));

    // Start page with content.
    randgen();
})