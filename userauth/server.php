<?php
session_start();
$SESSION_LIFETIME = 1800;

// Sets the garbage collection period.
ini_set('session.gc-maxlifetime', $SESSION_LIFETIME);
/*
 * Unsets and destroys the session if the LAST_ACTIVITY timestamp
 * is older than the specified number of seconds.
 */
if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > $SESSION_LIFETIME)) {
    // last request was more than 30 minutes ago
    session_unset();     // unset $_SESSION variable for the run-time
    session_destroy();   // destroy session data in storage
}
$_SESSION['LAST_ACTIVITY'] = time(); // update last activity time stamp

// Re-issues a session id after a certain time period to avoid session-fixation attachs.
if (!isset($_SESSION['CREATED'])) {
    $_SESSION['CREATED'] = time();
} else if (time() - $_SESSION['CREATED'] > 1800) {
    // session started more than 30 minutes ago
    session_regenerate_id(true);    // change session ID for the current session an invalidate old session ID
    $_SESSION['CREATED'] = time();  // update creation time
}

// @TODO necessary?
header('Content-Type: text/plain');

// In a real application, these should be in a config file instead
$db_host = '127.0.0.1';
$db_port = 3306;
$db_user = 'authtest';
$db_pass = 'cPN8LBTa2tRaKc78';
$db_name = 'authtest';

// Base-2 logarithm of the iteration count used for password stretching
$hash_cost_log2 = 8;
// Do we require the hashes to be portable to older systems (less secure)?
$hash_portable = FALSE;

function fail($pub, $pvt = '') {
    $debug = true;
    $msg = $pub;
    if ($debug && $pvt !== '')
        $msg .= ": $pvt";
    exit("An error occurred ($msg).\n");
}

function get_post_var($var) {
    $val = $_POST[$var];
    if (get_magic_quotes_gpc())
        $val = stripslashes($val);
    return trim($val);
}

/**
 * Returns whether or not the user is logged in
 */
function isLoggedIn() {
    if (array_key_exists('loggedin', $_SESSION)) {
        return $_SESSION['loggedin'];
    }
    else {
        return false;
    }
}

$op = $_POST['op'];
//if ($op !== 'register' && $op !== 'login')
//    fail('Unknown request');

require "PasswordHash.php";

// @TODO learn about input sanitising
$user = get_post_var('username');
$pass = get_post_var('password');

$hasher = new PasswordHash($hash_cost_log2, $hash_portable);

$db = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);
if (mysqli_connect_errno()) {
    fail('MySQL connect', mysqli_connect_error());
}

// Registering the user
if ($op == 'register') {
    // salts and hashes the password per the created $hasher's config.
    $hash = $hasher->HashPassword($pass);
    if (strlen($hash) < 20)
        fail('Failed to hash new password');
    unset($hasher);

    ($stmt = $db->prepare('insert into users (username, password) values (?, ?)'))
        || fail('MySQL prepare', $db->error);
    $stmt->bind_param('ss', $user, $hash)
        || fail('MySQL bind_param', $db->error);
    $stmt->execute()
        || fail('MySQL execute', $db->error);
    $stmt->close();
    $db->close();
}

// Logging in
if ($op == 'login') {
    $hash = '*'; // In case the user is not found
    ($stmt = $db->prepare('select password from users where username=?'))
        || fail('MySQL prepare', $db->error);
    $stmt->bind_param('s', $user)
        || fail('MySQL bind_param', $db->error);
    $stmt->execute()
        || fail('MySQL execute', $db->error);
    $stmt->bind_result($hash)
        || fail('MySQL bind_result', $db->error);
    if (!$stmt->fetch() && $db->errno)
        fail('MySQL fetch', $db->error);

    // Compares the submitted password with the stored salted and hashed password.
    if ($hasher->CheckPassword($pass, $hash)) {
        $_SESSION['loggedin'] = true;

        if ($_POST['remember'] === true) {

        }

        echo json_encode('Authentication Succeeded');
    } else {
        echo json_encode('Authentication Failed');
    }
    unset($hasher);
    $stmt->close();
    $db->close();
}

if ($op == 'private') {
    if (isLoggedIn()) {
        echo json_encode('YOUR SECRET WORD IS: BACON');
    }
    else {
        echo json_encode('User is not authorised.');
    }
}

if ($op == 'logout') {
    session_unset();     // unset $_SESSION variable for the run-time
    session_destroy();   // destroy session data in storage
    echo json_encode("Session Destroyed");
}

if ($op == 'loggedin') {
    echo json_encode(isLoggedIn());
}