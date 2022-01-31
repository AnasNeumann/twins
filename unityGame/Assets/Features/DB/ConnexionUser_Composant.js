#pragma strict

/*  Le composant qui permet la connexion au jeu via l'interface connexion_menu et la classe DAO getUser */
class ConnexionUser_Composant extends MonoBehaviour
{
	/* Fonction appelée via l'interface pour le changement de niveau si il y a connexion */
	function connexion(pseudo : String, password : String)
	{
		UserPref.setUser(pseudo); // on enregistre en local le nouveau nom d'utilisateur
		this.GetComponent(getUser).verifier(pseudo,password);
		yield WaitForSeconds(1);
	
		if(getUser.getVerification()==true)// si l'utlisateur existe
		{
			getUser.setVerification (false);
			Application.LoadLevel("MenuPrincipal");//charger le menu principal
		}
		else
		{
			this.GetComponent(connexion_menu).password = "erreur" ; 
		}
	}
}