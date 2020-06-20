<?php
require '../Connexion.php';
header('content-Type: application/json');
$of = $_GET['of'];
$articleSap = $_GET['refSap'];
$designation = $_GET['designation'];
$outillage = $_GET['ot'];
$dateDra = $_GET['dateDra'];
$datePol = $_GET['datePol'];
$date18 = $_GET['date18'];

$con = new Connexion();
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}
//Penser à remplacer la valeur $articleSap avec son index ARTICLE_SAP et rajouter index DESIGNATION
$sql="INSERT INTO `t_kit`(`OF`, `ARTICLE_SAP`, `DESIGNATION`, `OT`, `DATE_DRAPAGE`, `DATE_POLYM`, `DATE_-18`) 
VALUES (:of, :article, :designation, :ot, :dateDra, :datePol, :date18)";

$kits = $con->createQuery($sql, ['of'=>$of, 'article'=>$articleSap, 'designation'=>$designation, 'ot'=>$outillage, 'dateDra'=>$dateDra, 
'datePol'=>$datePol, 'date18'=>$date18,]);

$idKit = $con->lastId();
echo($idKit);
?>
