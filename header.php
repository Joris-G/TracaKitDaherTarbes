<?php
require 'Connexion.php';
$DB = new Connexion();
session_start();
if(empty($_SESSION['username'])){
  header("Location: login.php");
  }
?>
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Titre de la page</title>
  <link rel="stylesheet" href="style/styleIndex.css">
  <link rel="stylesheet" href="style/styleMenu.css"> 
</head>
<body>

<div class='menu'><?php include ('menu.php')?></div>
