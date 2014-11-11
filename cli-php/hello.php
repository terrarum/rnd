<?php
echo '<pre>';

exec("ps ax | grep httpd", $output);
foreach($output as $process) {
	echo $process . "<br>";
}

echo "<hr />";

system('ps ax | grep httpd', $retval);

echo '</pre>';
?>