<?php 
    include ('../header.php');
?>
<div class="content">
    <div class='sideBar-left'>
        <div class='sideBar-content'>
            <div class ='sideBar-title' id="titreInfoMoulage">Info moulage :</div>
            <div class ='sideBar-item' id='day'></div>
            <div class ='sideBar-item' id='worker'>Nom : <?php echo $_SESSION['username']; ?></div>
            <div class ='sideBar-item' id='moldingTool'>
                <div id='toolNumber'></div> 
                <img id="editToolIcone" width="20" height="20" src="src/img/crayon_daher_blanc-03.png" alt="image">  
            </div>
            <div class ='sideBar-item' id='numberOfPart'></div>
            <div class ='sideBar-item' id='numberOfMissingPart'></div>
        </div>
    </div>
    <div class="center-content">
        <div class='title' id="title">Nouveau moulage</div>
        <div class='toolChoice' id="toolChoice">
            <?php include ('../toolChoice.php') ?>
        </div>
        <div class='addKit' id="divScan">
            <textarea class='hidden' id='kitInput' onkeypress="return scanAction(event)"></textarea>
            <input class="bouton" type="button" id="btnScan" value="SCAN"></button>
            <input class="bouton" type="button" id="btnManuel" value="MANUEL"></button>
        </div>
        <div id ="divManu" style="display: none;">
            <div class="title2">Ajout manuel d'un kit</div>
            <div class="lblInput">
                <label for="articleSap">Article SAP</label>
                <input id="articleSap" type="text" name="articleSap">
            </div>
            <div class="lblInput">
                <label for="desArticle">Désignation Kit</label>
                <input id="desArticle" type="text" name="desArticle">
            </div>
            <div class="lblInput">
                <label for="workOrder">Numéro d'OF</label>
                <input id="workOrder" type="text" name="workOrder">
            </div>
            <div class="lblInput">
                <label for="pickerDate18">Date de péremption à -18°C</label>
                <input id="pickerDate18" type="datetime-local" name="pickerDate18">
            </div>
            <div class="lblInput">
                <label for="pickerDateDra">Date limite de drapage</label>
                <input id="pickerDateDra" type="datetime-local" name="pickerDateDra">
            </div>
            <div class="lblInput">
                <label for="pickerDatePol">Date limite de polymérisation</label>
                <input id="pickerDatePol" type="datetime-local" name="pickerDatePol">
            </div>
            <div class="lblInput">
            <input id="btnAddKitManualMode" type="button" name="btnAddKit" value="AJOUTER">
            </div>
        </div>
            <?php include ('../kitTable.php') ?>

        <!-- Ajouter un kit en manuel -->
        
    </div>
    <div class='sideBar-right'>
        <div class='sideBar-content'>
            <div class='sideBar-title' id="titreInfoMoulage">FONCTIONS</div>
                <div class ='sideBar-item menu' id='edit'>Editer un moulage</div>
                <div class ='sideBar-item menu' id='search'>Recherche</div>
        </div>
    </div>
</div>   
<script src="../scriptJS/scriptMain.js"></script>
<script src="../scriptJS/interractiveKitTable.js"></script>
<script src="../scriptJS/scriptTool.js"></script>
<script src="../scriptJS/scriptKit.js"></script>
<script src="../scriptJS/scriptMolding.js"></script>

<?php include ('../footer.php')?>
