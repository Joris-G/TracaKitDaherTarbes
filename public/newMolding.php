<?php 
    include ('../header.php');
    
?>
<div class="pageContent">
    <div class='sideBar' id="recapMolding">
        <div id="titreInfoMoulage">Info moulage :</div>
        <div id='day'></div>
        <div id='worker'>Nom : <?php echo $_SESSION['username']; ?></div>
        <div id='moldingTool'></div>
        <div id='numberOfPart'></div>
        <div id='numberOfMissingPart'>Pièce(s) manquante(s)</div>
    </div>
    <div class="content">
        <div class='title' id="title">Nouveau moulage</div>
        <div id="content">
            <div id="toolChoice">
                <?php include ('../toolChoice.php') ?>
            </div>
            <div id="kitTable">
                <?php include ('../kitTable.php') ?>
            </div>
        </div>
    </div>
</div>


<script src="../scriptJS/interractiveKitTable.js"></script>
<script src="../scriptJS/scriptMain.js"></script>
<script src="../scriptJS/scriptTool.js"></script>
<script src="../scriptJS/scriptKit.js"></script>
<script src="../scriptJS/scriptMolding.js"></script>

<?php include ('../footer.php')?>
