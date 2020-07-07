<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Authentification</title>
	<link href="style/styleAuthentification.css" type="text/css" rel="stylesheet">
</head>
<body>
    <div class="conteiner-fluid" id="content">
        <div id="title">AUTHENTIFICATION</div>
    
        <form id="form" action="authentification.php" method="post" name="login">
            <!-- <div>
                <label for="user">Entrer votre nom :</label>
                <input type="text" id="user" name="username" required>
            </div> -->
            <div>
                <label for="login">Scanner votre badge pour vous identifier</label>
                <textarea class='hidden' id='login' name='username' onkeypress="return loginAction(event)" required></textarea>
            </div>
            <div class="button">
                <button id='submit' type="submit">CONNECTION</button>
            </div>
        </form>
    </div>
    <script src="../scriptJS/login.js"></script>
</body>
</html>