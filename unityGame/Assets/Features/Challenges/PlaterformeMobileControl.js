/* la classe qui controle les déplacements continus des plateformes mobiles */
class PlaterformeMobileControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public  var positionMin      : float         ; // la position z du début du trajet.
	public  var positionMax      : float         ; // la position z de fin du trajet.
	public  var sens             : boolean       ; // le sens du trajet Debut->Fin(true) ou fin->debut(false)
	public  var pause            : boolean       ; // est-ce que la plante est en pause ou en mouvement. 
	public  var timePause        : float   = 0.0 ; // le temps de pause que fait le block avant de repartir. 
	public  var WarriorCollision : boolean       ; // est-ce que le garcon est sur le block ou non ?*
    private var targetWarrior    : GameObject    ; // le garcon.
    private var _transform       : Transform     ; // le  composant transform de la plateforme mobile. 

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start()
	{
		this.targetWarrior = GameObject.FindGameObjectWithTag ("warrior"); // on trouve l'objet garcon (le personnage petit frere)
		_transform = this.transform ; 
	}

	/* fonction éxécutée à chaque calcul d'une nouvelle frame */
	function Update () 
	{
		_transform.position.x = 0 ; // on freeze la position en x 
		if (this.pause == false) //  si le block n'est pas en pause , il avance dans le bon sens jusqu'a ce qu'il revient à sa position de pause.
		{
			if (this.sens) // si on doit aller vers la fin
			{
				if (_transform.position.z>=this.positionMax) // si on a atteind la fin
				{
					this.pause = true  ; // le block se met en pause 
					this.sens  = false ; // on repart dans l'autre sens 
				}
				else // sinon, si on n'est pas encore arrivé à la fin
				{
					if (Network.isServer) { _transform.position.z+=1.5*Time.deltaTime; }// on avance vers la fin 
					if (this.WarriorCollision) { this.targetWarrior.transform.position.z+=1.5*Time.deltaTime; } // si le garcon est sur la plateforme
				}
			}
			else // sinon, si on est dans l'autre sens (fin -> début)
			{
				if (_transform.position.z<=this.positionMin) // si on est bien retourné au début
				{
					this.pause = true ; // le block se met en pause 
					this.sens  = true ; // on repart dans l'autre sens
				}
				else  // sinon, si on n'est pas encore arrivé à la position de début
				{
					if (Network.isServer) { _transform.position.z-=1.5*Time.deltaTime; }// on continu de reculer vers la position de départ 
					if (this.WarriorCollision) { this.targetWarrior.transform.position.z-=1.5*Time.deltaTime; } // si le garcon est sur la plateforme
				}
			}
		}
		else // si le block est dans sa position ou il doit faire une pause
		{
			if (this.timePause >= 0.5)  // si le temps de pause est écoulé
			{
				this.timePause = 0.0   ; // on réinitialise le temps de pause
				this.pause     = false ; // la pause est finie on repart.  
			}
			else // sinon, si il reste du temps pour la pause
			{
				this.timePause += Time.deltaTime ; // on incrémente le temps de pause.
			}
		}
	}
	
	/* fonction calculée si notre objet touche un autre collider non trigger */
	function OnCollisionEnter(hit: Collision)
	{
		if(hit.gameObject.tag == "warrior") // si le garcon est sur la plateforme
		{
			this.WarriorCollision = true ;
		}
	}
	
	/* fonction calculée quand une collision entre notre objet et un autre collider prend fin */
	function OnCollisionExit(collisionInfo : Collision)
	{
		if(collisionInfo.gameObject.tag == "warrior") // si le garcon n'est plus sur la plateforme
		{
			this.WarriorCollision = false;
		}
	}
//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}