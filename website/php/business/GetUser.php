<?php
//on a besoin de la connexion et de la fonction de s�curit�
require_once ('Protection.php');
	if(isset($_POST['twins']))//protection contre les entr�e interdites
	{
		/* r�cup�ration des envois en POST */
		$pseudo   = Protection::protect($_POST['pseudo']);   // protection contre les injections
		$password = Protection::protect($_POST['password']); // protection contre les injections
		$password = Protection::encrypte($password);         // cryptage avant de l'ajouter dans la base de donn�es
//_____________________________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________________________
		$conn = mysqli_connect(SERVER, USER, PASSWORD, DB_NAME);
		if (!$conn)
		{
			die('Could not connect to MySQL: ' . mysqli_connect_error());//protection contre les erreurs de connexions � la base de donn�es
		}
		$result = mysqli_query($conn, "SELECT * FROM userTwins WHERE pseudo='".$pseudo."' AND password='".$password."';"); //la requete sql
		$num_results = mysqli_num_rows($result);// le nombre de r�sultats retourn�s normalement 0 ou 1.
		if ($num_results>0)//si il existe un utilisateur avec le pseudo et le mot de passe
		{
			echo "true";
		}
		else // sinon
		{
			echo "false";
		}
		//mysqli_free_result($result); // on libere la variable de r�sultat de la requete
		mysqli_close($conn); // on ferme la connexion � la base de donn�es
//_____________________________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________________________
	}
//�crit par ANAS NEUMANN et ACHREF BOUHADIDA
//the Twins par Prod'IT Studio
?>