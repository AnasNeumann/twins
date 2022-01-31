/* La classe qui s'occupe de controler les lanceur de fleches pour qu'ils en lancent */
class FlecheLancerControl extends MonoBehaviour 
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public  var weapon     : GameObject ; // la fleche lancé par ce lanceur.
	private var TimeTir    : float      ; // le temps qui sécoule entre chaque nouveau tir.
	private var serveur    : boolean    ; // est-ce qu'on est le serveur ? 
	private var _transform : Transform  ; // le composant transform du lanceur de fleche.

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start () 
	{
		_transform = this.transform ; 
		if (Network.isServer) // si on est le serveur
		{
			this.serveur = true ;
		}
		else // sinon 
		{
			this.serveur = false ;
		}
		this.TimeTir = 0 ; // on initialise la valeure du temps à Zero.
	}
	
	/* fonction éxécutée à chaque calcul d'une nouvelle frame */
	function FixedUpdate () 
	{
		if (this.serveur) // si on est le serveur 
		{
			attaque(); // on joue la création d'une nouvelle fleche
		}
	}

//______________________________________________________________________________________________________________________________________________________________
// AUTRES FONCTIONS
//______________________________________________________________________________________________________________________________________________________________

	function attaque()
	{
		if (this.TimeTir >= 2) // si le temps est venu de tirer
		{
			this.TimeTir = 0; // on réinitialise le temps entre chaque tir
			Network.Instantiate (this.weapon ,_transform.position , Quaternion(0,0,0,0),0); // on crée la fleche 
		}
		else // sinon 
		{
			this.TimeTir += Time.deltaTime; // on incrémente le temps 
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}