<?php
require '../Connexion.php';
$con = new Connexion();
$sql = "UPDATE t_moulage SET numOT = :getTool WHERE ID = :getId";
$editTool = $con->createQuery($sql, ['getTool'=> $_GET['tool'],'getId'=> $_GET['id']])
?>