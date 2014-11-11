<?php

header("Content-Type: image/png");
$string = "HELLO";
$width = 100;
$height = 100;

$image = imagecreatetruecolor($width, $height);

//We are making three colors, white, black and gray
$white = ImageColorAllocate($image, 255, 255, 255);
$black = ImageColorAllocate($image, 0, 0, 0);
$grey = ImageColorAllocate($image, 204, 204, 204);

$fontpath = realpath('.'); //replace . with a different directory if needed
putenv('GDFONTPATH='.$fontpath);

$verdana = '/Verdana.ttf';

//Make the background black
ImageFill($image, 0, 0, $black);

//Add randomly generated string in white to the image
// Image, size, angle, x, y, color, fontfile, text
imagettftext($image, 20, 0, 10, 40, $white, $verdana, $string);

//Output the newly created image in jpeg format
imagepng($image);

//Free up resources
imagedestroy($image);