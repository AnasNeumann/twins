/* la classe qui control les déplacements des box instanciés par la fille sur la scène */
class BoxControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	private var rayHit      : RaycastHit      ; // l'objet touché par le rayon
	private var move        : boolean         ; // est-ce qu'on controle le cube ?
	private var oldPosition : float           ; // la valeur de déplacement a prendre en compte.
	private var WarriorTest : boolean = false ; // est-ce le garcon est sur le cub ?
 	public  var _transform  : Transform       ; // le composant transform du cube crée par la fille

//______________________________________________________________________________________________________________________________________________________________
//	FONCTIONS DE BASES ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction calculée lors de la 1ere frame */
	function Start() 
	{
		_transform = this.transform ; // pour l'optimisation 
	}

	/* fonction éxécutée à chaque calcul d'une nouvelle image  */
	function FixedUpdate ()
	{
		_transform.position.x=0; //on, freeze la position en x
		var rayMouse = GameObject.Find("cameraFairy").GetComponent(Camera).ScreenPointToRay(Input.mousePosition); // le rayon est lancé de la caméra à la position de la souris
		if (move)
		{
			if(Physics.Raycast(rayMouse,rayHit))
			{
				if(rayHit.collider.name=="viseur" || rayHit.collider.name=="cube(Clone)") // si le rayon touche le viseur
				{
					_transform.position.z = rayHit.point.z;
					_transform.position.y = rayHit.point.y;
					if (WarriorTest) // si le garcon est sur le cube
					{
						var valeurDeplacement : float = _transform.position.z-oldPosition;
						networkView.RPC("deplacerWarriorRPC", RPCMode.AllBuffered,valeurDeplacement);
					}
				}
			}
		}
		if (Input.GetMouseButtonDown(0)) // si on appui avec la souris sur le cube
		{
			if(Physics.Raycast(rayMouse,rayHit) && rayHit.collider.gameObject==this.gameObject) // si le rayon touche le viseur
			{
				move=true; // il peut bouger
				this.rigidbody.useGravity=false; //il perd la gravité
			}
		}
		else if (Input.GetMouseButtonUp(0)) // si on lache le bouton gauche de la souris 
		{
			move=false; //il ne peut plus bouger
			this.rigidbody.useGravity=true; //il reprend la gravité
		}
		oldPosition=_transform.position.z; //la vielle position devient la posision actuelle.
	}
	
	
	/* fonction calculée si notre objet touche un autre collider non trigger */
	function OnCollisionEnter (hit: Collision)
	{
		/* si on touche le garcon et qu'il est plus haut que le cube et qu'on déplace le cube -> le garcon doit suivre le cube */
		if (hit.gameObject.tag=="warrior" && hit.gameObject.transform.position.y>_transform.position.y)
		{
			WarriorTest=true; // il est sur le cube.
		}
	}
	
	/* fonction éxécutée lors de la fin d'une Collision avec un autre objet non trigger */
	function OnCollisionExit (hit: Collision)
	{
		if(hit.gameObject.tag=="warrior") // si c'est le garcon 
		{
			WarriorTest=false; // il n'est plus sur le cube
		} 
	}

//______________________________________________________________________________________________________________________________________________________________
//	FONCTIONS RPC ET AUTRES
//______________________________________________________________________________________________________________________________________________________________
	
	/* fonction qui modifie en réseau la position du frere */
	@RPC
	function deplacerWarriorRPC(distance : float)
	{
		GameObject.FindGameObjectWithTag("warrior").transform.Translate(0,0,distance,Space.World);
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}