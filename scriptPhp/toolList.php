<?php
require '../vendor/autoload.php';
require '../Connexion.php';
$success = 0;
$msg = "Une erreur est survenue (script.php)";
$data = [];

$types = empty($_GET['types']) ? 'tool' : $_GET['types']; 
    
if ($types === 'tool'){
    $table = 't_tools';
    $foreign = 'programId';
}
//Rappel de l'objet connexion à la base avec passage de la requete et des paramètres
$con = new Connexion();
$sql="SELECT * FROM $table WHERE $foreign = ?";
$items= $con->createQuery($sql, [$_GET['filter']]);
//Transformation de l'objet en tableau
$articles= $items->fetchAll();
//Passage du tableau en JSON pour transfert de la raquete AJAX
header('content-Type: application/json');
echo json_encode(array_map(function($item){
return[
        'value' => $item['ID'], 
        'label' => $item['desOutillage'],
        'toolSap' => $item['numOtSap']
    ];
}, $articles));
?>
