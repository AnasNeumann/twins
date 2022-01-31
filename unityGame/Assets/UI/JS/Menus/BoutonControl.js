/* la classe qui controle de manière générale les boutons des menus */
class BoutonControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public var levelToload     : String    ; // le level que doit lancer le bouton quand on appui dessus
	public var normalTexture   : Texture2D ; // la texture quand on ne passe pas la souris sur le bouton
	public var rollOverTexture : Texture2D ; // la texture quand on passe la souris sur le bouton. 
	public var quitter         : boolean   ; // est-ce que le bouton sert à quitter le jeu
	public var connexion       : boolean   ; // est-ce que le bouton sert a se connecter sur la base de donnéess

	/* Les variables de classe de la connexion */
	public var pseudo     : String = "";
	public var password   : String = "";

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES 
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée quand on pass la souris sur le bouton */
	function OnMouseEnter()
	{
		this.guiTexture.texture = rollOverTexture ; // on met la bonne texture.
	}

	/* fonction éxécutée quand on ne passe la souris sur le bouton */
	function OnMouseExit()
	{
		this.guiTexture.texture = normalTexture ; // on met la bonne texture.
	}

	/* fonction éxécutée une fois que l'on a appuié sur le bouton avec le clic gauche de la souris */
	function OnMouseUp()
	{
		if (quitter) // si c'est le bouton quitter
		{	
			Application.Quit() ; // alors on quitte
		}
		else if (connexion)// sinon, si c'est un bouton pour charger un niveau
		{
			this.pseudo = GameObject.Find("cameraFairy").GetComponent(connexion_menu).pseudo;
			this.password = GameObject.Find("cameraFairy").GetComponent(connexion_menu).password;
			GameObject.Find("cameraFairy").GetComponent(ConnexionUser_Composant).connexion(pseudo,password);
		}
		else if(this.gameObject.name=="bouton_rejoindre")
		{
			var connexion : GameObject = GameObject.Find("connexion");
			connexion.GetComponent(Network_ServerConnexion).setremoteIP(GameObject.Find("cameraFairy").GetComponent(Rejoindre_menu).remoteIp);
			connexion.GetComponent(Network_ServerConnexion).setPassword("");
			connexion.GetComponent(Network_ServerConnexion).RejoindreServeur();
		}
		else if(this.gameObject.name=="bouton_jouer")
		{
			/* lancer la partie*/
			GameObject.Find("connexionNetwork").GetComponent(Network_ServerConnexion).setPassword(""); //on enregistre le mot de passe
			GameObject.Find("connexionNetwork").GetComponent(Network_ServerConnexion).StartServer(); //on démare le serveur
		}
		else if(this.gameObject.name=="bouton_quitter_jeu")
		{
			/* quitter la partie et revenir au menu principal */
			GameObject.Find("connexionNetwork").GetComponent(Network_ServerConnexion).QuitterNetwork(); // on quitte la partie
		}
		else if(this.gameObject.name=="bouton_reprendre")
		{
			/* on eteind tout les GUI du menu de pause */
			var actionPAuse = GameObject.Find("cameraFairy");
			actionPAuse.GetComponent(PauseMenu).fenetrePause.GetComponent(GUITexture).enabled    = false ;
			actionPAuse.GetComponent(PauseMenu).quitterBouton.GetComponent(GUITexture).enabled   = false ;
			actionPAuse.GetComponent(PauseMenu).reprendreBouton.GetComponent(GUITexture).enabled = false ;
			actionPAuse.GetComponent(PauseMenu).pause = false; // le jeu n'est plus en pause
		}
		else if(this.gameObject.name=="bouton_soumettre")
		{
			/* on va ici poster le score en ligne par ce que le joueur a appuyé sur "soumettre" dans la fenêtre bravo */
			GameObject.Find("finPartie").GetComponent(FinPartieControl).EnregistrementDataBase();
			yield WaitForSeconds (1);
			Application.LoadLevel(levelToload);
		}
		else if(this.gameObject.name=="meilleurs_scores")
		{
			Application.OpenURL("http://www.proditstudio.abdev.fr/php/best.php"); // on va sur la page des meilleurs socres en ligne
		}
		else
		{
			Application.LoadLevel(levelToload);
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________		
}