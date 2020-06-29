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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Titre de la page</title>
  <link rel="stylesheet" href="style/styleIndex.css">
  <link rel="stylesheet" href="style/styleMenu.css"> 
</head>
<body>
<div class='perso-body'>
<div class='header'><?php include ('menu.php')?></div>
