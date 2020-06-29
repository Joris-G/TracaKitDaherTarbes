<?php
require '../Connexion.php';
$kitId = $_GET['kitId'];
$moldingID = $_GET['moldingId'];
$toolNumber = $_GET['toolNumber'];

$con = new Connexion();
//Penser à remplacer la valeur $articleSap avec son index ARTICLE_SAP et rajouter index DESIGNATION
$sql='  UPDATE `t_kit` 
        SET `IdMoulage` = :moldingId, `OT` = :toolNumber
        WHERE `ID` = :kitId';

$kits = $con->createQuery($sql, ['moldingId'=> $moldingID, 'toolNumber'=>$toolNumber , 'kitId'=> $kitId]);
?>
