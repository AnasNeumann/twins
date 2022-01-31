/* La classe de création des menus (interfaces) de connexion à la base de données */
class connexion_menu  extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	/* Les variables de classe de la connexion */
	public  var pseudo     : String = "";
	public  var password   : String = "";

	/* les tailles et positions */
	public  var _positionX         : float ;
	public  var _positionYPseudo   : float ;
	public  var _positionYPassword : float ;
	public  var _tailleX           : float ;
	public  var _tailleY           : float ;
	private var _widthScreen       : float ; // la proportion en largeur
	private var _heightScreen      : float ; // la proportion en hauteur

	/* le style des champ de saisie */
	public  var skinToUse          : GUISkin ; // le style 

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES 
//______________________________________________________________________________________________________________________________________________________________
	
	/* fonction executée lors du calcul de la toute 1e image donc juste après Awake */
	function Start () 
	{
		if(UserPref.getUser()!=null && UserPref.getUser()!="") // si se n'est pas la première partie
		{
			pseudo   = UserPref.getUser(); // on ecrit la dernière valeure utilisée 
		}
		this._widthScreen                 = parseFloat(Screen.width)/1366 ; // on trouve le rapport en hauteur
		this._heightScreen                = parseFloat(Screen.height)/638 ; // on trouve le rapport en largeur
		if(_widthScreen>_heightScreen)
		{
			_tailleX           =  0.75*217*_widthScreen ; // on resize en largeur
			_tailleY           =  0.75*47*_widthScreen ; // on resize en longeur
			_positionX         = (parseFloat(Screen.width)/2)  + (50*_widthScreen*0.5);
			_positionYPseudo   = (parseFloat(Screen.height)/2) + (-4*_widthScreen*0.5)  -_heightScreen*15;
			_positionYPassword = (parseFloat(Screen.height)/2) + (118*_widthScreen*0.5) -_heightScreen*15;
			skinToUse.textField.contentOffset.y = Screen.height*0.05*this._widthScreen;  // on descend le texte
		}
		else
		{
			_tailleX           = 0.75*217*_heightScreen ; // on resize en largeur
			_tailleY           = 0.75*47*_heightScreen ; // on resize en longeur
			_positionX         = (parseFloat(Screen.width)/2)  + (50*_heightScreen*0.5);
			_positionYPseudo   = (parseFloat(Screen.height)/2) + (15*_heightScreen*0.5);
			_positionYPassword = (parseFloat(Screen.height)/2) + (137*_heightScreen*0.5);
			skinToUse.textField.contentOffset.y = 0 ; 
		}
		skinToUse.textField.fontSize     = 0.70*_tailleY;
		skinToUse.textField.padding.left = 0.6*_tailleY;
	}

//______________________________________________________________________________________________________________________________________________________________
// AUTRES FONCTIONS 
//______________________________________________________________________________________________________________________________________________________________

	/* Fonction d'affichage et de controle d'appui sur les boutons et champs */
	function OnGUI()
	{
		pseudo   = GUI.TextField(Rect(_positionX,_positionYPseudo,_tailleX,_tailleY), pseudo,skinToUse.textField);
		password = GUI.TextField(Rect(_positionX,_positionYPassword,_tailleX,_tailleY), password,skinToUse.textField);
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________		
}