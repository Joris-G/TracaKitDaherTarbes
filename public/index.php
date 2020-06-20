<?php
// Initialiser la session
  //session_start();
  // Vérifiez si l'utilisateur est connecté, sinon redirigez-le vers la page de connexion;
  //var_dump($_SESSION);
?>

<?php require ('../header.php') ?>
<div class="welcome" id="Profil">
        <div>BIENVENUE </div>
    <div id='user'><?php echo $_SESSION['username']; ?></div>
</div>

<?php require ('../footer.php') ?>