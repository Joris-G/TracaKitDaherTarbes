<?php
require '../Connexion.php';
    $sql = "SELECT * FROM t_user WHERE EQUIPE = :teamNumber";
    $con = new Connexion();
    $list = $con->createQuery($sql, ['teamNumber'=>$_GET['team']]);
    $users = $list->fetchAll();
    //var_dump($users);
     header('content-Type: application/json');
     echo json_encode($users);
//     echo json_encode(array_map(function($user){
// return [
//         'NOM' => $user['NOM'], 
//         'PRENOM' => $user['PRENOM'],
//         'MATRICULE' => $user['MATRICULE'],
//         'ROLE' => $user['ROLE']
//     ];
// }, $users));
?>