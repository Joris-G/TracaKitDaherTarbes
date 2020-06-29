<?php 
    include ('../header.php');
?>
<div class="content">
    <div class='sideBar-left'>
        <div class='sideBar-content'>
            <div class='sideBar-title' id="titreInfoMoulage">Info utilisateur :</div>
                <div class ='sideBar-item'>
                    <label for="username" class='label-sideBar'>Nom d'utilisateur : </label>
                    <div class='value-sideBar' id='username'><?php echo $_SESSION['username'];?></div>
                </div>
                
                <div class ='sideBar-item'>
                    <label for="role" class='label-sideBar'>Rôle : </label>
                    <div class='value-sideBar' id='role'><?php echo $_SESSION['role'];?></div>
                </div>

                <div class ='sideBar-item'>
                    <label for="matricule" class='label-sideBar'>Matricule : </label>
                    <div class='value-sideBar' id='matricule'><?php echo $_SESSION['matricule'];?></div>
                </div>
        </div>
    </div>
    <div class="center-content">
        <div class='title' id="title">Utilisateur <?php echo $_SESSION['username']; ?></div>
        <div id="qrcode"></div>
        <div class="content" id='content'></div>
    </div>
    <div class='scan' id='divScan'></div>

    <div class='sideBar-right'>
        <div class='sideBar-content'>
            <div class='sideBar-title' id="titreInfoMoulage">FONCTIONS</div>
            <div class ='sideBar-item menu' id='newUser'>Créer utilisateur</div>
                <div class ='sideBar-item menu' id='print'>Imprimer QRCode utilisateur</div>
                <div class ='sideBar-item menu' id='printAll'>Imprimer les QR Code de toutes l'équipe</div>
                <div class ='sideBar-item menu' id='search'>Recherche</div>
        </div>
    </div>
</div>
<script src="../scriptJS/qrcode.js"></script>
<script src="../scriptJS/user.js"></script>


<?php include ('../footer.php')?>
