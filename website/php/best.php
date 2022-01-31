<!-- 
	Ce site web est d&eacute;velopp&eacute; en sa totalit&eacute; par Anas Neumann et Achref Bouhadida qui en sont les seuls propri&eacute;taires.
 -->
<html>
<!--____________________________________________________________________________________________________________________________________________-->
<!--  le titre et les styles utilisé -->
<!--____________________________________________________________________________________________________________________________________________-->
	<head>
		<title>The Twins</title>
		<link rel="stylesheet" type="text/css" href="../css/index.css">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.css">
		<link rel="icon" type="image/x-icon" href="../images/title.png" />
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<script src="http://code.jquery.com/jquery.js"></script>
		<script src="../html/bootstrap.js"></script>
	</head>
<!--____________________________________________________________________________________________________________________________________________-->
<!--  le corps de la page et le menu gauche -->
<!--____________________________________________________________________________________________________________________________________________-->
	<body>
		<div class="centrePage" >
				<img src="../images/Bulle.png" class="bulle">
				<img src="../images/logoTwins.png" class="logoTwins">
				<img src="../images/BulleDeux.png" class="bulleDeux">
				<br/><br/>
				<div class="bordure"></div>  <!-- une bordure bleu -->
				<div class="fenetrePrincipal">
					<div class="menuGauche"> <!-- le menu à gauche -->
						<br/>
						<a href="../html/index.html" class="btnBenu"><img src="../images/puce.png" width="8%"> Pr&eacute;sentation</a><br/>
						<img src="../images/barre.png" width="100%">
						<a href="../html/images.html" class="btnBenu"><img src="../images/puce.png" width="8%"> Galerie d'images</a><br/>
						<img src="../images/barre.png" width="100%">
						<a href="../html/videos.html" class="btnBenu"><img src="../images/puce.png" width="8%"> Bande annonce</a><br/>
						<img src="../images/barre.png" width="100%">
						<a href="../html/telecharger.html" class="btnBenu"><img src="../images/puce.png" width="8%"> T&eacute;l&eacute;chargement</a><br/>
						<img src="../images/barre.png" width="100%">
						<a href="../php/best.php" class="btnBenuSelection"><img src="../images/puce.png" width="8%"><b> Communaut&eacute;</b></a><br/>
						<img src="../images/barre.png" width="100%">
						<a href="../html/proditstudio.html" class="btnBenu"><img src="../images/puce.png" width="8%"> Prod'IT Studio</a><br/>
						<img src="../images/barre.png" width="100%">
					</div>
<!--____________________________________________________________________________________________________________________________________________-->
<!--  la partie centrale de la page la plus importante -->
<!--____________________________________________________________________________________________________________________________________________-->
					<div class="partieCentraleBest">
						<div class="proditTitre">Meilleurs scores en ligne</div><br/><br/>
						<?php
							//on passe dans la zone dynamique de la page
							require_once ('Protection.php');
							/* les listes d'objets passée en variables */
							$userList  = Array(); // la liste de tout les utilisateurs
							$scoreList = Array(); // la liste de tout les scores ordonée décroissante.
							//_______________________________________________________________________________________________________________________
							//_______________________________________________________________________________________________________________________
							/* la récupération de tout les scores de manière ordonée */
								$conn = mysqli_connect(SERVER, USER, PASSWORD, DB_NAME);
								if (!$conn)
								{
									die('Could not connect to MySQL: ' . mysqli_connect_error());
								}
								$result = mysqli_query($conn, 'SELECT * FROM scoreTwins ORDER BY score LIMIT 3;');
								while (($row = mysqli_fetch_array($result)) != NULL)
								{
									$idScore=$row['idScore'];
									$idPartie=$row['idPartie'];
									$idUser=$row['idUser'];
									$score=$row['score'];
									$scoreEntity= new EntityScore($idScore,$idPartie,$idUser,$score);
									$scoreList[]=$scoreEntity;
								}
								mysqli_close($conn);
							//________________________________________________________________________________________________________________________
							//________________________________________________________________________________________________________________________
							/* la récupération de tout les utilisateur du jeu */
								$connexion = mysqli_connect(SERVER, USER, PASSWORD, DB_NAME);
								if (!$connexion)
								{
									die('Could not connect to MySQL: ' . mysqli_connect_error());
								}
								$resultDeux = mysqli_query($connexion, 'SELECT * FROM userTwins;');
								while (($row = mysqli_fetch_array($resultDeux)) != NULL)
								{
									$id=$row['id'];
									$pseudo=$row['pseudo'];
									$password=$row['password'];
									$userEntity= new EntityUser($id,$pseudo,$password);
									$userList[]=$userEntity;
								}
								mysqli_close($connexion);
							//________________________________________________________________________________________________________________________
							//________________________________________________________________________________________________________________________
							/* l'affichage dans un tableau des Trois meilleurs scores avec les pseudo et sous format m/s */
							$comptMedaille = 1 ; // le niveau du meilleur score affiché
							foreach ($scoreList as $elementScore)
							{
								echo "<table class='tableauScore'><tr class='trScore'>";
								if ($comptMedaille == 1) // si on en est au premier meilleurs score
								{
									echo "<td class='tdScoreImage'><img src='../images/or.png'></td><td class='tdScore'> M&eacute;daille d'or";
								}
								else if($comptMedaille == 2)
								{
									echo "<td class='tdScoreImage'><img src='../images/silver.png'></td><td class='tdScore'> M&eacute;daille d'argent";
								}
								else if($comptMedaille == 3)
								{
									echo "<td class='tdScoreImage'><img src='../images/bronze.png'></td><td class='tdScore'> M&eacute;daille de bronze";
								}
								else
								{
									echo "<td class='tdScore'>";
								}
								$compt   = 0; // une variable de passage pour l'affiche mode M:S
								$minutes = 0; // les minutes passée pour l'affiche mode M:S
								for ($i=1;$i<=$elementScore->score;$i++ )
								{
									$compt++;
									if($compt==60)
									{
										$minutes += 1; 
										$compt=0;
									}
								}
								echo " decern&eacute;e pour le score  de ".$minutes.":".$compt." &agrave; "; // on affiche le score au format minutes/segondes
								foreach($userList as $elementUser)
								{
									if($elementUser->id==$elementScore->idUser)
									{	
										echo "<span class='valeur'>".$elementUser->pseudo."<span> !";
									}
								}
								echo "</td></tr></table><br/><img src='../images/barre.png' width='40%'><br/>";
								$comptMedaille++; // on incrémente et donc on réduit la médaille recu
							}
						?>
					</div>
<!--____________________________________________________________________________________________________________________________________________-->
<!--  la fin du corps de la page -->
<!--____________________________________________________________________________________________________________________________________________-->
				</div>
				<div class="bordureNoire"></div><!-- une bordure -->
				<div class="fenetrePrincipal">
					<img src="../images/prodit.png" class="proditLogo"> Tout droits r&eacute;serv&eacute;s par Anas NEUMANN et Achref BOUHADIDA, l'&eacute;quipe de 
					<a href="https://www.facebook.com/pages/ProdIT-Studio/136208419883179" style="color:#1aa4a6;font-size:16px;font-weight:bold">Prod'IT Studio</a>
				</div>
		</div>
	</body>
</html>
<!--____________________________________________________________________________________________________________________________________________-->
<!--  l'onglet qui s'ouvrent pour l'inscription -->
<!--____________________________________________________________________________________________________________________________________________-->