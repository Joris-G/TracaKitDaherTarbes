<?php
require '../Connexion.php';
$con = new Connexion();
$sql = "UPDATE t_kit SET Validation = 0 WHERE ID = :getId";
$kitvalid = $con->createQuery($sql, ['getId'=> $_GET['id']])
?>