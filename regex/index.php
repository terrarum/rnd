<?php

// $pattern = "/(https?:\/\/)?(www\.)?[\S]+(\.com|\.net|\.co\.uk|\.org)/i";
$pattern = "%/tweets/[^/]+/[^/]+/%";

$string = "/tweets/inception/6584684131684351/";

$message = preg_match($pattern, $string, $matches);

echo '<pre>';
var_dump($matches);
echo '</pre>';

?>