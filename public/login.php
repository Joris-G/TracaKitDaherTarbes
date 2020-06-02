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
            <div>
                <label for="user">Entrer votre nom :</label>
                <input type="text" id="user" name="username" required>
            </div>
            <div class="button">
                <button type="submit">CONNECTION</button>
            </div>
        </form>
    </div>
</body>
</html>