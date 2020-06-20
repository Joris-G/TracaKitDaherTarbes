<?php
require '../Connexion.php';
    $sql = "SELECT * FROM t_moulage WHERE ID = :idMoulage";
    $con = new Connexion();
    $list = $con->createQuery($sql, ['idMoulage'=>$_GET['moldingId']]);
    $molding = $list->fetchAll();
    header('content-Type: application/json');
    echo json_encode(array_map(function($moldingInfo){
return[
        'value' => $moldingInfo['ID'], 
        'Outillage' => $moldingInfo['numOT'],
        'DateDeCreation' => $moldingInfo['DATE_DE_CREATION'],
        'DateLimiteDeDrapage' => $moldingInfo['dateLimDrap'],
        'DateLimiteDePolymerisation' => $moldingInfo['dateLimPol'],
        'DateDePeremptionA-18C' => $moldingInfo['dateLim18']
    ];
}, $molding));
?>