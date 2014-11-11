<?php
// Cookie syntax: key, value, ttl(s), path, domain, secure, httponly
setcookie("user", "James", time()+60, null, null, false, true);
?>
Setting user as James.
<br />
<a href="index2.php">continue</a>