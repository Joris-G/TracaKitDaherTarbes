<?php 
require '../Connexion.php';
$con = new Connexion();
$sql = 'INSERT INTO `t_moulage` (numOT, dateLimDrap, dateLimPol,dateLim18) VALUES (:toolNumber,:dateLimDra,:dateLimPol,:dateLim18)';
//$con = new PDO('mysql:host=localhost:3306;dbname=traca;charset=utf8mb4','root', 'root');
// $query = $con->prepare($sql);
// $query->bindParam(':toolNumber', $_GET['tool']);
// $query->bindParam(':dateLimDra', $_GET['dateDra']);
// $query->bindParam(':dateLimPol', $_GET['datePol']);
// $query->bindParam(':dateLim18', $_GET['date18']);
// $query->execute();
$moulage = $con->createQuery($sql, ['toolNumber'=> $_GET['tool'], 'dateLimDra'=> $_GET['dateDra'], 'dateLimPol'=> $_GET['datePol'], 
'dateLim18'=> $_GET['date18']]);
$idMolding = $con->lastId();
echo($idMolding);
?>
