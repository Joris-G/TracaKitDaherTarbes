<?php
session_start();
    $username = stripslashes($_POST['username']);
    $_SESSION['username'] = $username;
    var_dump($_SESSION);
    header("Location: index.php");