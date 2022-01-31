// la classe qui controle les positions et taille du fond noir
class fondNoirControl extends MonoBehaviour
{
	/* fonction éxécutée lors de calcul de la toute première frame */
	function Start()
	{
		this.guiTexture.enabled           = true ; // on allume le GUI
		this.guiTexture.pixelInset.width  = Screen.width        ; // on resize en largeur
		this.guiTexture.pixelInset.height = Screen.height       ; // on resize en longeur
		this.guiTexture.pixelInset.x      = this.guiTexture.pixelInset.width/-2  ; // on décale en fonction de la taille
		this.guiTexture.pixelInset.y      = this.guiTexture.pixelInset.height/-2 ; // on décale en fonction de la taille
		Destroy(this.gameObject,1); // l'objet ne vit qu'une segonde
	}
	
	/* fonction éxcutée à chaque calcul d'une nouvelle image (entre 24 et 60 fois dans une segonde) */
	function Update()
	{
		this.guiTexture.color.a-=Time.deltaTime*3; // l'objet devient invisile petit a petit.
	}
}