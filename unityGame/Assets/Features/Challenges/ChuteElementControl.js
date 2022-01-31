/* la classe qui controle la chute d'un élément d'un pont qui s'éffondre (1er énigme) */
class ChuteElementControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public  var targetName : String      ;  // le nom du pont duquel cet élément fait parti
	private var target     : GameObject  ;  // le pont duquel cet élément fait parti
	public var forceX      : int         ;  // la force appliquée en x
	public var forceY      : int         ;  // la force appliquée en y
	public var forceZ      : int         ;  // la force appliquée en z
	private var _rigidbody : Rigidbody   ;  // le rigidbody de l'élément 

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start () 
	{
		this.target = GameObject.FindGameObjectWithTag(this.targetName);
		// on attibut aléatoirement les valeurs des forces appliquées sur X et Y
		// sur y (donc la vitesse de déscente) c'est reglé manuellement pour obtenir le plus bel éffet.
		this.forceZ = Random.Range(-1,1);
		this.forceX = Random.Range(-1,1);
		this._rigidbody = this.rigidbody ; 
	}
	
	/* fonction éxécutée à chaque calcul d'une nouvelle frame */
	function Update () 
	{
		// si l'élément doit tomber et qu'il n'a pas été détruit
		if (this.target)
		{
			if (this.target.GetComponent(PontControl).destruction ==0)
			{
				if (this.gameObject.GetComponent(BoxCollider)) // si l'objet faisait barrière de collision,
				{
					_rigidbody.mass = 1 ; // il prend la même mass que les autres planche ( avant il faisait 1000 )
					this.gameObject.GetComponent(BoxCollider).enabled = false; // il ne le fait plus.
				}
				/* on fait tomber l'objet avec la gravité */
				_rigidbody.useGravity  = true ;
				_rigidbody.angularDrag = 0.05 ;
				_rigidbody.drag        = 0    ;
				_rigidbody.AddForce(10*this.forceX,-0.25*this.forceY,10*this.forceZ); // on applique de forces
				Destroy(this.gameObject,5);
			}
		}
	}
//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}