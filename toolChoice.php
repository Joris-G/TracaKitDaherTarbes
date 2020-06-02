<?php require_once('Connexion.php'); ?>
<link rel="stylesheet" href="style/styleToolChoice.css">
<div id='title'>Choix de l'outillage</div>
<form id="programChoice">
<?php
            $con = new Connexion();
            $sql= "SELECT * FROM t_program";
            $programs= $con->createQuery($sql);
            ?>
    <select id="programs" class='programs' name='programs' data-target='#tool' data-source='/AppliTracaDaherTarbes/scriptPhp/toolList.php?types=tool&filter=$prog'>
        <option value="0">Selectionner un programme avion</option>
        <?php foreach ($programs as $program){?>
         <option value="<?= $program->ID ?>"><?= $program->Program_Name; ?></option>
        <?php } ?>
    </select>

    <select style="display: none;" name='toolChoice' id="tool" class='tools'>
        <option value="0">Selectionner un outillage</option>
    </select>
</form>
