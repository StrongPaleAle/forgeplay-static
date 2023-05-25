<!DOCTYPE html>
<html>
<head>
    <script>
        function checkEmail() {
  var emailInput = document.getElementById("email");
  var email = emailInput.value;
  var regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!regex.test(email)) {
    alert("L'email deve avere il dominio Gmail.com");
    emailInput.focus();
    return false;
  }
  return true;
}
    </script>
	<title>Raccogli email degli utenti</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			margin: 0;
			padding: 0;
			background-color: #f2f2f2;
		}

		header {
			background-color: #4CAF50;
			color: white;
			padding: 20px;
			text-align: center;
		}

		h1 {
			margin-top: 0;
			font-size: 36px;
		}

		form {
			max-width: 600px;
			margin: 0 auto;
			padding: 20px;
			background-color: white;
			box-shadow: 0 0 10px rgba(0,0,0,0.2);
			border-radius: 5px;
		}

		label {
			display: block;
			margin-bottom: 10px;
			font-size: 18px;
			font-weight: bold;
		}

		input[type="email"] {
			display: block;
			width: 100%;
			padding: 10px;
			border: none;
			border-radius: 5px;
			margin-bottom: 20px;
			font-size: 18px;
			background-color: green;
		}

		input[type="submit"] {
			background-color: #4CAF50;
			color: white;
			padding: 10px 20px;
			border: none;
			border-radius: 5px;
			font-size: 18px;
			cursor: pointer;
		}

		input[type="submit"]:hover {
			background-color: #3e8e41;
		}

		p.success {
			color: green;
			font-weight: bold;
			margin-top: 20px;
		}

		p.error {
			color: red;
			font-weight: bold;
			margin-top: 20px;
		}
	</style>
</head>
<body>
	<header>
		<h1>Forgeplay ti invita a  diventare un Alfa Tester!!!</h1>
	</header>
	    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" onsubmit="return checkEmail();">
		<label for="email">Inserisci la tua email di Gmail:</label>
		<input type="email" id="email" name="email" required>
		<input type="submit" value="Iscriviti">
	</form>

	<?php
		// Se il form è stato sottomesso
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			// Recupera l'email dal form
			$email = $_POST["email"];

			// Scrivi l'email in un file di testo
			$file = "emails.txt";
			$current = file_get_contents($file);
			$current .= $email . ",\n";
			file_put_contents($file, $current);

			// Mostra un messaggio di successo
			echo "<p class='success'>Grazie per esserti iscritto alla Alfa Test</p>";
		}
	?>
</body>
</html>
