#pragma strict

/* cette classe controle les déplacements et actions des fleches qui sortent de l'eau */
class FlecheControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________
	
	public  var bloodImpact : GameObject ; // le système de particules de sang qui apparait si la fleche touche un objet
	private var _transform  : Transform  ; // le composant transform de la fleche qui vole.
//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________
	
	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start () 
	{
		Destroy(this.gameObject,2); // le temps de vie de la fleche avant qu'elle ne soit détruite . 
		_transform = this.transform ; // pour l'optimisation
	}
	
	/* fonction éxécutée à chaque calcul d'une nouvelle frame */
	function FixedUpdate () 
	{
		_transform.Translate(0,8*Time.deltaTime,0); // la fleche on continuellement 
	}
	
	/* fonction calculée si notre objet touche un autre collider non trigger */
	function OnCollisionEnter(hit: Collision)
	{
		if (hit.gameObject.tag=="fary" || hit.gameObject.name=="cube(Clone)" || hit.gameObject.tag=="warrior") // si on entre dans le garcon, la fille ou un cube
		{
			Instantiate(bloodImpact,Vector3(0,_transform.position.y+0.5,_transform.position.z),Quaternion(0,0,0,0)); // on crée l'impact de sang.
			_transform.position.y = -1000 ; // la fleche se cache
			Destroy(this.gameObject)          ; // la fleche se détruit
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}