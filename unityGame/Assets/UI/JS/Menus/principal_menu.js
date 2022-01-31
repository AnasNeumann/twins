#pragma strict

/* La classe qui affiche à l'écran le menu principal */
class principal_menu extends MonoBehaviour
{
	/* Fonction d'affichage et de controle d'appui sur les boutons et champs */
	function OnGUI()
	{
		if(GUI.Button(Rect(500,50,150,40),"Céer une nouvelle partie"))
		{
			/* Aller choisir un personnage pour démarer un serveur */
			Application.LoadLevel("ChoixPersonnage");
		}
		
		if(GUI.Button(Rect(500,100,150,40),"Rejoindre une partie"))
		{
			/* Rejoindre une partie déjà lancé par un serveur */
			Application.LoadLevel("Rejoindre");
		}
		
		if(GUI.Button(Rect(500,150,150,40),"Instructions"))
		{
			/* Apprendre à utiliser le jeu */
			Application.LoadLevel("Instruction");
		}
		if(GUI.Button(Rect(500,200,150,40),"Meilleurs scores en lignes"))
		{
			/* Afficher les meilleurs scores de tout les joueurs */
			Application.LoadLevel("BestScore");
		}
		if(GUI.Button(Rect(500,250,150,40),"Quitter"))
		{
			/* Quitter le jeu */
			Application.Quit();
		}
		GUI.Label(Rect(500,300,250,40), "Meilleur score local : "+UserPref.getBestScore());
	}
}