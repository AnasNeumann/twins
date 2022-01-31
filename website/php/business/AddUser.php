<?php
//on a besoin de la connexion et de la fonction de s�curit�
require_once ('Protection.php');
	if(isset($_POST['twins']))//protection contre les entr�e interdites
	{
		/* r�cup�ration des envois en POST */
		$pseudo   = Protection::protect($_POST['pseudo']);   //protection contre les injections
		$password = Protection::protect($_POST['password']); //protection contre les injections
		$password = Protection::encrypte($password);         //cryptage avant de l'ajouter dans la base de donn�es
//_____________________________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________________________
		$conn = mysqli_connect(SERVER, USER, PASSWORD, DB_NAME);
		if (!$conn)
		{
			die('Could not connect to MySQL: ' . mysqli_connect_error()); //protection contre les erreurs de connexions � la base de donn�es
		}
		$result = mysqli_query($conn, "SELECT * FROM userTwins WHERE pseudo='".$pseudo."';"); //la requete sql de v�rification
		if (@mysqli_num_rows($result)>0) //si il existe un utilisateur avec le pseudo
		{
			//mysqli_free_result($result);//on libere la variable de r�sultat de la requete
			mysqli_close($conn);  //on ferme la connexion � la base de donn�es
			header('Location: ../html/erreur.html');
		}
		else//sinon
		{
			//mysqli_free_result($result);//on libere la variable de r�sultat de la requete
			mysqli_close($conn); // on ferme la connexion � la base de donn�es
			$connexion = mysqli_connect(SERVER, USER, PASSWORD, DB_NAME); //nouvelle connexion
			mysqli_query($connexion, "INSERT INTO userTwins (`pseudo`,`password`) VALUES ('".$pseudo."','".$password."');"); //la requete sql d'ajout
			mysqli_close($connexion);
			header('Location: ../html/bravo.html');
		}
//_____________________________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________________________
	}
//�crit par ANAS NEUMANN et ACHREF BOUHADIDA
//the Twins par Prod'IT Studio
?>