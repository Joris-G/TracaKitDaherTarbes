<?php
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Feuille de traçabilité récapitulative d'un moulage</title>
        <link href="../public/style/stylePrintSheet.css" type="text/css" rel="stylesheet">
    </head>

    <body>
        <div id="header">
            <img id="logoDaher" src="../public/src/img/logoDaher.png" alt="" width=10% height=10%></td>
            <div id='titre'> Feuille de traçabilité outillage</div>
            </tr>
        </div>

        <div id="moldingInfo">
            <div id="tool"></div>
            <div id="compagnon">Moulé par : <?php echo $_SESSION['username']; ?></div>
            <div id="moldingDate"></div>
            <div id="moldingId"></div>
        </div>    

        <div id="printable2"></div>
        <table id="tableauRecap2"></table>
        <script src="../scriptJS/prinsheet.js"></script>
    </body>

</html>