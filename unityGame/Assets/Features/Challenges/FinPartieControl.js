/* la classe qui controle d'un fin de partie de jeu quand la fille et le garcon on atteind le village de l'ouest */
class FinPartieControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public  var finPartie    : boolean  = false ; // est-ce que la partie doit se finir ? 
	public  var pseudoUn     : String           ; // le pseudo du premier joueur
	public  var pseudoDeux   : String           ; // le pseudo du segond joueur
	public  var score        : int              ; // le score à enregistrer en base ou localement
	public  var messageScore : String           ; // le message de score sous forme Mintues::Secondes à afficher
	private var test         : boolean = false  ; // variable de control pour éxéuter une seule fois le passage au niveau "Bravo"

	/* les tailles et positions pour l'affichage du score qui vient d'être fait */
	private var _positionX    : float   ; // la position en x
	private var _positionY    : float   ; // la position en Y
	public  var remoteIp      : String  ; // l'ip du serveur qui a lancé la partie
	private var _widthScreen  : float   ; // la proportion en largeur
	private var _heightScreen : float   ; // la proportion en hauteur
	public  var skinToUse     : GUISkin ; // le styleà utilisé
	private var _tailleX      : float   ; // la taille du GUI en x
	private var _tailleY      : float   ; // la taille du GUI en Y

//_____________________________________________________________________________________________________________________________________________________________
//  FONCTIONS DE BASE ET PREDEFINIES
//_____________________________________________________________________________________________________________________________________________________________

	/* fonction calculée lors de l'appel du script donc tout au début même avant Start */
	function Awake()
	{
		DontDestroyOnLoad(this); // Ne pas détruire ce composant car il doit y avoir réseaux meme après avoir chargé un niveau
	}
	
	/* fonction executée lors du calcul de la toute 1e image donc juste après Awake */
	function Start () 
	{
		this._widthScreen                 = parseFloat(Screen.width)/1366 ; // on trouve le rapport en hauteur
		this._heightScreen                = parseFloat(Screen.height)/638 ; // on trouve le rapport en largeur
		if(_widthScreen>_heightScreen)
		{
			_tailleX           =  0.75*217*_widthScreen ; // on resize en largeur
			_tailleY           =  0.75*60*_widthScreen ; // on resize en longeur
			_positionX         = (parseFloat(Screen.width)/2);
			_positionY         = (parseFloat(Screen.height)/2)+(155*_heightScreen*0.5);
		}
		else
		{
			_tailleX           = 0.75*217*_heightScreen ; // on resize en largeur
			_tailleY           = 0.75*60*_heightScreen ; // on resize en longeur
			_positionX         = (parseFloat(Screen.width)/2);
			_positionY         = (parseFloat(Screen.height)/2)+(155*_heightScreen*0.5);
		}
		skinToUse.label.fontSize = 0.70*_tailleY;
	}
	
	/* fonction qui affiche le menu à l'écran grace à la caméra */
	function OnGUI()
	{
		if(this.test) // si la partie est finie
		{
			GUI.Label(new Rect(_positionX,_positionY,_tailleX,_tailleY),this.messageScore,skinToUse.label);
		}
	}

	/* fonction calculée quand le garcon entre dans le collider de ce gameObject */
	function OnTriggerEnter (hit : Collider)
	{
		if (hit.gameObject.tag=="warrior" && hit.GetComponent(NetworkView).isMine == true) // si je suis le frère
		{
			networkView.RPC("finPartieRPC", RPCMode.AllBuffered); //on envoi la fin de la partie en RPC
		}
	}
	
	/* fonction éxécutée à chaque calcul d'une nouvelle Frame 24->60 fois par secondes */
	function Update()
	{
		if(finPartie) // si la partie doit se finir
		{
			passageBravo(); // on passe au prochain niveau
		}
	}
	
//_____________________________________________________________________________________________________________________________________________________________
// AUTRES FONCTIONS ET RPC
//_____________________________________________________________________________________________________________________________________________________________

	@RPC
	public function finPartieRPC()
	{
		this.finPartie = true ; // la partie est finie
	}

	/* fonction qui fait le changement de niveau vers bravo */
	public function passageBravo()
	{	
		if(!test) // si on n'a pas encore éxcuté les instructions suivantes.
		{
			this.test = true ; // on ne le refera plus
			this.pseudoUn     = GameObject.FindGameObjectWithTag("warrior").name;                           // on trouve le nom du premier joueur pour la base de données
			this.pseudoDeux   = GameObject.FindGameObjectWithTag("fary").name;                              // on trouve le nom du segond joueur pour la base de donées
			this.score        = GameObject.Find("cameraFairy").GetComponent(CalculTime).getTimeScore();     // on trouve le score pour la base de donnée
			this.messageScore = GameObject.Find("cameraFairy").GetComponent(CalculTime).getMessageEcran(); // on trouve le message de score pour la fenetre bravo
			EnregistrementLocal(); // on enregistre automatiquement le score dans les scores local.
			Network.RemoveRPCs(this.networkView.viewID);                                                    // on supprime les appel sur cette identifiant
			yield WaitForSeconds(1);
			GameObject.Find("connexionNetwork").GetComponent(Network_ServerConnexion).QuitterNetwork(); // on quitte la partie
			Application.LoadLevel("Bravo") ; // on passe au menu bravo
			this.GetComponent(NetworkView).enabled=false;
		}
	}

	/* fonction qui sert à faire l'enregistrement en local du score */
	public function EnregistrementLocal()
	{
		UserPref.setBestScore(this.score);//meilleur score local;
	}

	/* fonction qui appel la classe d'accès au données AddScore pour enregistrer le score en base de données */
	public function EnregistrementDataBase()
	{
		UserPref.setBestScore(this.score);//meilleur score local;
		this.GetComponent(AddScore).addScore(this.score,this.pseudoUn,this.pseudoDeux); // de tout les joueurs
	}

//_____________________________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________________________	
}