<?php
$sql = "UPDATE t_kit SET Validation = 0 WHERE ID = :getId";
$con = new PDO('mysql:host=localhost:3306;dbname=traca;charset=utf8mb4','root', '');
$query = $con->prepare($sql);
$query->bindParam(':getId', $_GET['id']);
$query->execute();
?>