/* la classe qui control que les pages passent automatiquement de l'une à une autre */
class PassageAutomatique extends MonoBehaviour
{
	public var timeToChange : float      ; // le temps de vie de la scène.
	public var levelToLoad  : String     ; // le nom de la prochaine scène à charger.
	public var target       : GameObject ; // les gui des logos
	public var timeMax      : int = 6    ; // le temps maximal sur la scène
 
	/* fonction éxécutée lors de calcul de la toute première frame */
	function Start()
	{
		this.timeToChange = 0.0; // on initialise le temps que l'on reste sur cette même image
	}
	
	/* fonction éxcutée à chaque calcul d'une nouvelle image (entre 24 et 60 fois dans une segonde) */
	function Update()
	{
		if(this.timeToChange <3) // le temps n'est pas encore venu de changer 
		{
			this.timeToChange+=Time.deltaTime; // on incéremente le temps
		}
		else if (this.timeToChange <timeMax && this.timeToChange >=3) // sinon on commence a faire dispraitre le target
		{
			this.timeToChange+=Time.deltaTime; // on incéremente le temps
			this.target.guiTexture.color.a -= 0.5*Time.deltaTime ; // le GUI disparait.
		}
		else // sinon, si le temps est venu de changer de scène.
		{
			Application.LoadLevel(levelToLoad); // on charge le prochain niveau
		}
		if(Input.GetKeyDown("escape") || Input.GetKeyDown(KeyCode.Escape)) // si j'appuis sur echap
		{
			Application.LoadLevel("Connexion"); // on charge directement le menu de connexion sans lire les autres logos
		}
	}
}