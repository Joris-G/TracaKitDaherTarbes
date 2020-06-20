<?php 
require '../Connexion.php';
$con = new Connexion();
$sql = '    UPDATE `t_moulage` 
            SET numOT = :toolNumber, dateLimDrap = :dateLimDra, dateLimPol = :dateLimPol,dateLim18 = :dateLim18 
            WHERE ID = :moldingId';
$moulage = $con->createQuery($sql, [    'moldingId'=> $_GET['moldingID'],
                                        'toolNumber'=> $_GET['tool'], 
                                        'dateLimDra'=> $_GET['dateDra'], 
                                        'dateLimPol'=> $_GET['datePol'], 
                                        'dateLim18'=> $_GET['date18']]);
?>
