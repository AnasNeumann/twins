/* la classe DAO qui sert à envoyer dans la base de données le nouveau score fait par deux joueur */
class AddScore extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	private static  var addScoreURL : String = "http://proditstudio.abdev.fr/php/Add_Score.php?";

//______________________________________________________________________________________________________________________________________________________________
// GETTEURS ET SETTEURS SUR NOS VARIABLES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction qui renvoi l'URL du script php d'ajout de score */
	public static function getURL() : String
	{
		return this.addScoreURL;
	}

//______________________________________________________________________________________________________________________________________________________________
// AUTRES FONCTIONS 
//______________________________________________________________________________________________________________________________________________________________

	/* fonction qui ajoute le score en ligne */
	public function addScore(score : int , pseudoFrere : String , pseudoSoeur : String)
	{
		/* Création d'un formulaire pour intéragire avec le php */
		var formScore : WWWForm  = new WWWForm();
		var twins     : String   = "true";

		/* Information à envoyer à PHP */
		formScore.AddField("pseudoUn",pseudoSoeur);
		formScore.AddField("pseudoDeux",pseudoFrere);
		formScore.AddField("score",score);
		formScore.AddField("twins",twins);
		
		Debug.Log(pseudoSoeur+" "+pseudoFrere);

		/* On appel le script php et on lui envoi les valeurs en POST */
		var www : WWW = new WWW(addScoreURL,formScore);
		 
		/*  On attend que l'envoi au php ai finni de charger */
		yield www;
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________	
}