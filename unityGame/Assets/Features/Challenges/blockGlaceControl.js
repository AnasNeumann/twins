#pragma strict

/* la classe qui control les blocs de glace qui sortent de l'eau */
class blockGlaceControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public var targetApparition : GameObject         ; // l'endroit ou le bloc de glace doit apparaitre
	public var TimeToLive       : float      = 0     ; // le temps que le bloc doit vivre 
	public var TimeToDie        : float      = 0     ; // le temps durant lequel le bloc déscend avant de mourrir.
	public var onLive           : boolean    = true  ; // est-ce que le bloc est en vie ou non .   
	public var _transform       : Transform          ; // le composant transform du block de glage.

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start()
	{
		_transform.rotation.eulerAngles = Vector3(270,0,0); // on ré-oriente le bloc
	}

	/* fonction éxécutée à chaque calcul d'une nouvelle image  */
	function Update () 
	{
		if (this.onLive) // si le bloc est encore en vie
		{ 
			if (this.TimeToLive >= 4) // si le bloc a vécu 3 segondes
			{
				this.onLive = false ; // le temps est écoulé le bloc doit déscendre
			}
			else // sinon
			{
				this.TimeToLive += Time.deltaTime ; // le temps n'est pas encore écoulé, le bloc peut resté la ou il est . 
			}
		}
		else
		{
			if (this.TimeToDie >= 2) // si le bloque est déscendu durant 1 segondes
			{
				this.targetApparition.GetComponent(GlaceCreatorControl).creation = true ; // on peut recréer un bloc sur l'eau .
				Destroy (this.gameObject); // le temps est écoulé le bloque doit disparaitre
			}
			else // sinon 
			{
				_transform.Translate(0,-0.5*Time.deltaTime,0,Space.World); // le bloc déscend dans l'eau.
				this.TimeToDie += Time.deltaTime ;  // on incrémente le temps de tombée à l'eau 
			}
		}
		_transform.position.x = 0 ; // on freeze la position x en zero . 
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}