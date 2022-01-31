/* la classe qui controle la fenetre du menu pause dans la scène de jeu */
class PauseMenu extends MonoBehaviour
{
 
	public  var fenetrePause    : GameObject         ; // la fenetre a faire apparaitre et disparaitre avec échap
	public  var quitterBouton   : GameObject         ; // le bouton quitter
	public  var reprendreBouton : GameObject         ; // le bouton de reprise du jeu
	public  var pause           : boolean    = false ; // est-ce que le jeu est en pause.

	/* les tailles et positions */
	private  var _positionX    : float   ; // la position en x
	private  var _positionY    : float   ; // la position en Y
	public  var remoteIp      : String  ; // l'ip du serveur qui a lancé la partie
	private var _widthScreen  : float   ; // la proportion en largeur
	private var _heightScreen : float   ; // la proportion en hauteur
	public  var skinToUse     : GUISkin ; // le style à utiliser
	private var _tailleX      : float   ; // la taille du GUI en x
	private var _tailleY      : float   ; // la taille du GUI en Y
	
	
	/* fonction executée lors du calcul de la toute 1e image donc juste après Awake */
	function Start () 
	{
		this._widthScreen                 = parseFloat(Screen.width)/1366 ; // on trouve le rapport en hauteur
		this._heightScreen                = parseFloat(Screen.height)/638 ; // on trouve le rapport en largeur
		if(_widthScreen>_heightScreen)
		{
			_tailleX           =  0.75*410*_widthScreen ; // on resize en largeur
			_tailleY           =  0.75*60*_widthScreen ; // on resize en longeur
			_positionX         = (parseFloat(Screen.width)/2) - (_tailleX/2);
			_positionY         = (parseFloat(Screen.height)/2);
		}
		else
		{
			_tailleX           = 0.75*410*_heightScreen ; // on resize en largeur
			_tailleY           = 0.75*60*_heightScreen ; // on resize en longeur
			_positionX         = (parseFloat(Screen.width)/2) - (_tailleX/2);
			_positionY         = (parseFloat(Screen.height)/2);
		}
		skinToUse.label.fontSize = 0.70*_tailleY;
	}
	
	/* fonction qui affiche le menu à l'écran grace à la caméra */
	function OnGUI()
	{
		if(this.pause)
		{
			GUI.Label(new Rect(_positionX,_positionY,_tailleX,_tailleY),"Adresse IP : "+ Network.player.ipAddress,skinToUse.label);
		}
	}
	

	function Update()
	{
	    if(Input.GetKeyDown("escape") || Input.GetKeyDown(KeyCode.Escape)) // si j'appuis sur pause . 
	    {
	    	if (!pause) // si le jeu n'est pas en pause
	    	{
	    		/* on allume les GUI(s) */
				fenetrePause.GetComponent(GUITexture).enabled    = true ; 
				quitterBouton.GetComponent(GUITexture).enabled   = true ; 
				reprendreBouton.GetComponent(GUITexture).enabled = true ;
				this.pause = true; // le jeu est en pause
			}
			else
			{
				/* on éteind les GUI(s) */
				fenetrePause.GetComponent(GUITexture).enabled    = false ;
				quitterBouton.GetComponent(GUITexture).enabled   = false ;
				reprendreBouton.GetComponent(GUITexture).enabled = false ;
				this.pause = false; // le jeu n'est plus en pause
			}
	    }
	}

}

