<?php
//on a besoin de la connexion et de la fonction de sécurité
require_once ('Protection.php');
	if(isset($_POST['twins']))//protection contre les entrée interdites
	{
		/* récupération des envois en POST */
		$score      = Protection::protect($_POST['score']);//protection contre les injections
		$pseudoUn   = Protection::protect($_POST['pseudoUn']);//protection contre les injections
		$pseudoDeux = Protection::protect($_POST['pseudoDeux']);//protection contre les injections
		/* les variables intermédiares */
		$idUn;
		$idDeux;
		$dernierePartie;
//_____________________________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________________________
		/* la récupération de la dernière partie */
		$conn = mysqli_connect(SERVER, USER, PASSWORD, DB_NAME);
		if (!$conn)
		{
			die('Could not connect to MySQL: ' . mysqli_connect_error());//protection contre les erreurs de connexions à la base de données
		}
		$result         = mysqli_query($conn, "SELECT MAX(idPartie) AS maximum FROM partieTwins;");//la requete sql de vérification de la dernière partie
		$row            = mysqli_fetch_array($result);
		$dernierePartie = $row['maximum'];
		mysqli_close($conn);// on ferme la connexion à la base de données
//_____________________________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________________________
		/* création d'une nouvelle partie */
		$connexion = mysqli_connect(SERVER, USER, PASSWORD, DB_NAME);//nouvelle connexion
		$dernierePartie ++;// on incrémente l'id de la dernière partie
		mysqli_query($connexion, "INSERT INTO partieTwins (`idPartie`) VALUES (".$dernierePartie.");");//la requete sql d'ajout
		mysqli_close($connexion);
//_____________________________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________________________
		/* récupération des id des joueurs */
		$connexionDeux = mysqli_connect(SERVER, USER, PASSWORD, DB_NAME);	
		if (!$connexionDeux)
		{
			die('Could not connect to MySQL: ' . mysqli_connect_error());
		}
		$resultDeux  = mysqli_query($connexionDeux, 'SELECT * FROM userTwins');
		while (($row = mysqli_fetch_array($resultDeux)) != NULL)
		{
			if($pseudoUn==$row['pseudo'])// si on a trouvé l'un des pseudo
			{
				$idUn  = $row['id'];// on retient l'id
			}
			if($pseudoDeux==$row['pseudo'])// si on a trouvé l'autre pseudo
			{
				$idDeux = $row['id'];// on retient l'id
			}
		}
		mysqli_close($connexionDeux);
//_____________________________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________________________
		/* Enregistrement du score pour le premier joueur */
		$connexionTrois = mysqli_connect(SERVER, USER, PASSWORD, DB_NAME);//nouvelle connexion
		mysqli_query($connexionTrois, "INSERT INTO scoreTwins (`idPartie`,`idUser`,`score`) VALUES (".$dernierePartie.",".$idUn.",".$score.");");//la requete sql d'ajout
		mysqli_close($connexionTrois);
//_____________________________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________________________
		/* Enregistrement du score pour le premier joueur */
		$connexionQuatre = mysqli_connect(SERVER, USER, PASSWORD, DB_NAME); //nouvelle connexion
		mysqli_query($connexionQuatre, "INSERT INTO scoreTwins (`idPartie`,`idUser`,`score`) VALUES (".$dernierePartie.",".$idDeux.",".$score.");");//la requete sql d'ajout
		mysqli_close($connexionQuatre);		
	}
//écrit par ANAS NEUMANN et ACHREF BOUHADIDA
//the Twins par Prod'IT Studio
?>