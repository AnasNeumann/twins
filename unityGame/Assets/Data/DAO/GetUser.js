#pragma strict

/* La classe qui contient la méthode de vérification de l'existence de l'utilisateur dans la base de données de prodIT Studio */
class getUser extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	/* Les variables de classe url du script php et vérification de l'attibut twins contre les accès indésirables*/
	private static var getUserURL   : String = "http://proditstudio.abdev.fr/php/GET_User.php?"; 
	private static var twins        : String = "true";
	private static var verification : boolean; //si le user existe en dataBase

//______________________________________________________________________________________________________________________________________________________________
// GETTEURS ET SETTEURS SUR NOS VARIABLES
//______________________________________________________________________________________________________________________________________________________________

	public static function getVerification() : boolean
	{
		return verification;
	}

	public static function setVerification (newValue : boolean)
	{
		this.verification = newValue;
	}

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES 
//______________________________________________________________________________________________________________________________________________________________

	/* fonction executée lors du calcul de la toute 1e image donc juste après Awake */
	function Start()
	{
		setVerification (false); //faux au départ
	}

//______________________________________________________________________________________________________________________________________________________________
// AUTRES FONCTIONS 
//______________________________________________________________________________________________________________________________________________________________

	/* verifier si l'utilisateur existe en base de donnée pour la conenxion */
	/* La routine IEnumerator qui est appelée */
	function verifier(pseudo : String, password: String)
	{
		/* Création d'un formulaire pour intéragire avec le php */
		var formVerifier : WWWForm  = new WWWForm();

		/* Information à envoyer à PHP */
		formVerifier.AddField("pseudo",pseudo);
		formVerifier.AddField("password",password);
		formVerifier.AddField("twins",twins);

		/* On appel le script php et on lui envoi les trois valeurs en POST */
		var www : WWW = new WWW(getUserURL,formVerifier);

		/*  On attend que l'envoi au php ai finni de charger */
		yield www;

		if (www.text=="true")//Si le user existe le php echo true 
		{
			setVerification (true);// on change la valeur de la vérification
		}
	} 
//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}