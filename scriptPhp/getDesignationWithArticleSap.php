<?php 
require '../Connexion.php';
$con = new Connexion();
$article = $_GET['articleSap'];
$sql = "SELECT desSimplifee FROM t_ref WHERE numArticleSap = :articleSap";
$kit = $con->createQuery($sql, ['articleSap'=> $article]);
$designations = $kit->fetchAll();
 foreach ($designations as $designation => $item) {
     echo  $item['desSimplifee'];
     }
?>