#pragma strict

/* la classe qui controle les actions de la balancoire qui sert a ouvrir les deux vignes */
class BalancoireControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public  var openVigne    : boolean = false ; // est-ce que les vignes doivent s'ouvrir ou non .
	private var positionFixe : Vector3         ; // les positions x, y et z que doit garder la balancoire.
	private var rotationY    : float           ; // la rotation sur l'axe y que la balancoire doit garder.
	private var rotationZ    : float           ; // la rotation sur l'axe z que la balancoire doit garder.
	private var _transform   : Transform       ; // le composant transform de la plante mobile

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start () 
	{
		this._transform = this.transform ; // pour l'optimisation 
		/* on fixe les rotations et position */
		this.positionFixe = _transform.position ; 
		this.rotationY    = _transform.eulerAngles.y;
		this.rotationZ    = _transform.eulerAngles.z;
	}

	/* fonction éxécutée à chaque calcul d'une nouvelle frame avec régularisation des différence de temps entre chaque image */
	function FixedUpdate()
	{
		_transform.position      = this.positionFixe ; // on freeze les positions.
		_transform.eulerAngles.y = this.rotationY; // on freeze les rotations en y.
		_transform.eulerAngles.z = this.rotationZ; // on freeze les rotations en z.
	}
	
	/* fonction éxécutée lorsque l'on touche un autre collider */
	function OnTriggerEnter (hit: Collider)
	{
		if (hit.gameObject.name=="interupteurVigne") // si on entre dans l'interupteur pour ouvrir les vignes
		{
			this.openVigne = true ; // les vignes peuvent s'ouvrir.
		}
	}
//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}