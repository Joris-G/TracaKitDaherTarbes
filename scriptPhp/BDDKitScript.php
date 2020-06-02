<?php
header('content-Type: application/json');
$of = $_GET['of'];
$articleSap = $_GET['refSap'];
$outillage = $_GET['ot'];
$dateDra = $_GET['dateDra'];
$datePol = $_GET['datePol'];
$date18 = $_GET['date18'];

$con = new PDO('mysql:host=localhost:3306;dbname=traca;charset=utf8', 'root', '');
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}
//Penser à remplacer la valeur $articleSap avec son index ARTICLE_SAP et rajouter index DESIGNATION
$sql="INSERT INTO `t_kit`(`OF`, `ARTICLE_SAP`, `OT`, `DATE_DRAPAGE`, `DATE_POLYM`, `DATE_-18`) 
VALUES (:of, :article, :ot, :dateDra, :datePol, :date18)";
$stmt = $con->prepare($sql);
$stmt->bindParam(':of', $of);
$stmt->bindParam(':article', $articleSap);
$stmt->bindParam(':ot', $outillage);
$stmt->bindParam(':dateDra', $dateDra);
$stmt->bindParam(':datePol', $datePol);
$stmt->bindParam(':date18', $date18);
$stmt->execute();

$idKit = $con->lastInsertId();
echo($idKit);
?>
