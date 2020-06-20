<?php
require '../Connexion.php';
$kitId = $_GET['kitId'];
$moldingID = $_GET['moldingId'];

$con = new Connexion();
//Penser à remplacer la valeur $articleSap avec son index ARTICLE_SAP et rajouter index DESIGNATION
$sql='  UPDATE `t_kit` 
        SET `IdMoulage` = :moldingId 
        WHERE `ID` = :kitId';

$kits = $con->createQuery($sql, ['moldingId'=> $moldingID , 'kitId'=> $kitId]);
?>
