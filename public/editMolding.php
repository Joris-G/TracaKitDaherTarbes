<?php 
    include ('../header.php'); 
?>
<link rel="stylesheet" href="style/styleEditingMolding.css">
<div class='title' id="title">Editer un moulage existant</div>

<div class='sideBar' id="moldingSettings">
    <div id="idMolding"></div>
    <div id="toolPanel"></div>
</div>

<div id="content" class="content">
    <div id="toolChoice"><?php include ('../toolChoice.php') ?></div>
    <table class="kitTable" id="tableKit"></table>
</div>
<script src="../scriptJS/scriptMolding.js"></script>
<script src="../scriptJS/scriptEditMolding.js"></script>
<script src="../scriptJS/scriptTool.js"></script>
<script src="../scriptJS/scriptKit.js"></script>
<?php include ('../footer.php')?>