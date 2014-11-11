<?php
echo "User is ";
if (isset($_COOKIE['user'])) {
    echo $_COOKIE['user'] . '.';
}
else {
    echo 'unknown.';
}
?>
<br />
<a href="index.php">back</a>
<br />
<a href="delete.php">delete cookie</a>