<?php
require '../Connexion.php';
$con = new Connexion();
$sql = "UPDATE t_kit SET Validation = 0 WHERE ID = :getId";
// $con = new PDO('mysql:host=localhost:3306;dbname=traca;charset=utf8mb4','root', 'root');
// $query = $con->prepare($sql);
// $query->bindParam(':getId', $_GET['id']);
// $query->execute();
$kitvalid = $con->createQuery($sql, ['getId'=> $_GET['id']])
?>