// la classe qui controle les positions et taille des GUI des menus
class GUITaille extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	private var _widthScreen     : float      ; // la proportion en largeur
	private var _heightScreen    : float      ; // la proportion en hauteur
	public var _width            : float      ; // la largeur du GUI  
	public var _height           : float      ; // la hauteur du GUI 
	public var pixelCorrectionX  : float      ; // est-ce qu'on doit déplacer le GUI et comment en X ?
	public var pixelCorrectionY  : float      ; // est-ce qu'on doit déplacer le GUI et comment en Y ?
	public var pause             : boolean    ; // est-ce que le GUI concerne un élément du menu pause ? 
	public var logo              : boolean    ; // est-ce que le GUI est un logo ? 
	public var alpha             : float      ; // la texture du GUI
	public var vitesse           : float = 0.5; // la vitesse d'apraition du GUI 
//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES 
//______________________________________________________________________________________________________________________________________________________________
	
	function Start()
	{
		if(this.pause==false)
		{
			this.guiTexture.enabled       = true                          ; // on allume le GUI
			 
		}
		if (!this.logo) // si le GUI n'est pas un logo
		{
			this.alpha                    = this.guiTexture.color.a     ; // on initialise l'alpha
			this.guiTexture.color.a       = 0                           ; // on réduit l'opacité
		}
		this._widthScreen                 = parseFloat(Screen.width)/1366 ; // on trouve le rapport en hauteur
		this._heightScreen                = parseFloat(Screen.height)/638 ; // on trouve le rapport en largeur
		if(_widthScreen>_heightScreen)
		{
			this.guiTexture.pixelInset.width  = _width*_widthScreen         ; // on resize en largeur
			this.guiTexture.pixelInset.height = _height*_widthScreen        ; // on resize en longeur
			this.guiTexture.pixelInset.x      = pixelCorrectionX*(_width*_widthScreen)/2  ; // on décale en fonction de la taille
			this.guiTexture.pixelInset.y      = pixelCorrectionY*(_height*_widthScreen)/2 ; // on décale en fonction de la taille

		}
		else
		{
			this.guiTexture.pixelInset.width  = _width*_heightScreen         ; // on resize en largeur
			this.guiTexture.pixelInset.height = _height*_heightScreen        ; // on resize en longeur
			this.guiTexture.pixelInset.x      = pixelCorrectionX*(_width*_heightScreen)/2  ; // on décale en fonction de la taille
			this.guiTexture.pixelInset.y      = pixelCorrectionY*(_height*_heightScreen)/2 ; // on décale en fonction de la taille
		}
	}
	
	/* fonction calculée à chaque calcul d'une nouvelle frame (24->60 fps) */
	function Update()
	{
		if (!this.logo && this.guiTexture.color.a<this.alpha) // si le GUI n'est pas un logo
		{
			this.guiTexture.color.a+=vitesse*Time.deltaTime ; // on incrémente l'aplha
		}
		else if(!this.logo && this.guiTexture.color.a>this.alpha) // si on a dépassé
		{
			this.guiTexture.color.a=this.alpha; // on reprend le bon alpha.
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________		
}