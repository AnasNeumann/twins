#pragma strict

/* la classe qui affiche le menu pour rejoindre une partie */
class Rejoindre_menu extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	/* les tailles et positions */
	private var _positionX    : float   ; // la position en x
	private var _positionY    : float   ; // la position en Y
	public  var remoteIp      : String  ; // l'ip du serveur qui a lancé la partie
	private var _widthScreen  : float   ; // la proportion en largeur
	private var _heightScreen : float   ; // la proportion en hauteur
	public  var skinToUse     : GUISkin ; // le styleà utilisé
	private var _tailleX      : float   ; // la taille du GUI en x
	private var _tailleY      : float   ; // la taille du GUI en Y

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES 
//______________________________________________________________________________________________________________________________________________________________

	
	/* fonction executée lors du calcul de la toute 1e image donc juste après Awake */
	function Start () 
	{
		this._widthScreen                 = parseFloat(Screen.width)/1366 ; // on trouve le rapport en hauteur
		this._heightScreen                = parseFloat(Screen.height)/638 ; // on trouve le rapport en largeur
		if(_widthScreen>_heightScreen)
		{
			_tailleX           =  0.75*217*_widthScreen ; // on resize en largeur
			_tailleY           =  0.75*47*_widthScreen ; // on resize en longeur
			_positionX         = (parseFloat(Screen.width)/2)  + (50*_widthScreen*0.5);
			_positionY         = (parseFloat(Screen.height)/2) + (118*_widthScreen*0.5) -_heightScreen*15;
			skinToUse.textField.contentOffset.y = Screen.height*0.05*this._widthScreen;  // on descend le texte
		}
		else
		{
			_tailleX           = 0.75*217*_heightScreen ; // on resize en largeur
			_tailleY           = 0.75*47*_heightScreen ; // on resize en longeur
			_positionX         = (parseFloat(Screen.width)/2)  + (50*_heightScreen*0.5);
			_positionY         = (parseFloat(Screen.height)/2) + (137*_heightScreen*0.5);
			skinToUse.textField.contentOffset.y = 0 ; 
		}
		skinToUse.textField.fontSize     = 0.70*_tailleY;
		skinToUse.textField.padding.left = 0.6*_tailleY;
	}


	
	/* fonction qui affiche le menu à l'écran grace à la caméra */
	function OnGUI()
	{
		remoteIp   = GUI.TextField(Rect(_positionX,_positionY,_tailleX,_tailleY), remoteIp,skinToUse.textField);
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________		
}