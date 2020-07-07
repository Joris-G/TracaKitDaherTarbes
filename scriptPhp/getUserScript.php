<?php
require '../Connexion.php';
$con = new Connexion();
$matricule = $_GET['matricule'];
$sql = "SELECT * FROM t_user WHERE :matricule";
$user = $con->createQuery($sql,['matricule'=>$matricule]);
$user = $user->fetch();
// $lastname = $user['NOM'];
// $surname = $user['PRENOM'];
// $role = $user['ROLE'];
header('content-Type: application/json');
echo json_encode($user);
?>