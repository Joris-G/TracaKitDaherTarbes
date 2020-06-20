<?php 
require '../Connexion.php';
$con = new Connexion();
$sql = 'INSERT INTO `t_moulage` (numOT, dateLimDrap, dateLimPol,dateLim18) VALUES (:toolNumber,:dateLimDra,:dateLimPol,:dateLim18)';
$moulage = $con->createQuery($sql, ['toolNumber'=> $_GET['tool'], 'dateLimDra'=> $_GET['dateDra'], 'dateLimPol'=> $_GET['datePol'], 
'dateLim18'=> $_GET['date18']]);
$idMolding = $con->lastId();
echo($idMolding);
?>
