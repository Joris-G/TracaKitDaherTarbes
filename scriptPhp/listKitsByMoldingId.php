<?php
require '../Connexion.php';
    $sql = "SELECT * FROM t_kit WHERE IdMoulage = :idMoulage";
    $con = new Connexion();
    $list = $con->createQuery($sql, ['idMoulage'=>$_GET['moldingId']]);
    $kits = $list->fetchAll();
    header('content-Type: application/json');
    echo json_encode(array_map(function($kit){
return[
        'value' => $kit['ID'], 
        'OF' => $kit['OF'],
        'ARTICLE SAP' => $kit['ARTICLE_SAP'],
        'DESIGNATION' => $kit['DESIGNATION'],
        'DATE DE PEREMPTION A -18°C' => $kit['DATE_-18'], 
        'DATE LIMITE DE DRAPAGE' => $kit['DATE_DRAPAGE'],
        'DATE LIMITE DE POLYMERISATION' => $kit['DATE_POLYM']
    ];
}, $kits));
?>