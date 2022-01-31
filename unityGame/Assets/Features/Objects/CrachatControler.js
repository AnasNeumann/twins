/* la classe qui crée les mouvements et control des crachats des enemis */
class CrachatControler extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public var impactCrachat : GameObject     ; // le systeme de particule d'impact lors du touché
	public var sens          : boolean = false; // le sens d'avancé du crachat
	private var _transform   : Transform      ; // le composant transform du crachat d'une plante fixe

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction extecutée lors du calcul de la première image */
	function Start()
	{
		_transform = this.transform ; // pour l'optimisation 
		if (sens) // si on doit se tourner vers la droite
		{
			_transform.rotation.eulerAngles = Vector3(90,-90,0); // on se tourne vers la droite
		}
		else // sinon 
		{
			_transform.rotation.eulerAngles = Vector3(90,90,0); // on se tourne vers la gauche
		}
		Destroy(this.gameObject,2.5); // cet objet ne vie que 2.5 segondes
	}

	/* fonction exécutée à chaque calcul d'une nouvelle image avec régularisation des différence de temps entre chaque images */
	function FixedUpdate()
	{
		if (sens) // si on est tourné vers la droite
		{
			_transform.Translate(0,0,0.05,Space.World); // on avance vers la droite
		}
		else  // sinon 
		{
			_transform.Translate(0,0,-0.05,Space.World); //on avance vers la gauche
		}
		_transform.position.x=0; // on controle la position en x.
	}
	
//______________________________________________________________________________________________________________________________________________________________
// VERIFICATION DES COLLISIONS
//______________________________________________________________________________________________________________________________________________________________

	/* fonction calculée si notre objet touche un autre collider non trigger */
	function OnCollisionEnter (hit: Collision)
	{
		var InstanceOfImpact : GameObject; // l'oject d'impact
		if(hit.gameObject.tag=="warrior")// si la collision est faite avec le frere
		{
			if (sens) // si on est tourné vers la droite
			{
				InstanceOfImpact = Instantiate(impactCrachat,Vector3(0,this.transform.position.y+0.05,this.transform.position.z+0.05),this.transform.rotation);
				InstanceOfImpact.transform.rotation.eulerAngles = Vector3(360,90,0);
				hit.gameObject.rigidbody.AddForce(0,0,1000); // le garcon recule
				Destroy(InstanceOfImpact,1);
			}
			else // sinon
			{
				InstanceOfImpact = Instantiate(impactCrachat,Vector3(0,this.transform.position.y+0.05,this.transform.position.z-0.05),this.transform.rotation);
				InstanceOfImpact.transform.rotation.eulerAngles = Vector3(360,90,0);
				hit.gameObject.rigidbody.AddForce(0,0,-1000); // le garcon recule
				Destroy(InstanceOfImpact,1);
			}
			this.transform.position.y=-1000; // on cache l'objet 
		}
		else if (hit.gameObject.name!="distant_plant" && hit.gameObject.tag!="warrior") // si on touche un objet
		{
			if (sens) // si on est tourné vers la droite
			{
				InstanceOfImpact = Instantiate(impactCrachat,Vector3(0,this.transform.position.y+0.05,this.transform.position.z+0.05),this.transform.rotation);
				InstanceOfImpact.transform.rotation.eulerAngles = Vector3(360,90,0);
				Destroy(InstanceOfImpact,1);
			}
			else // sinon
			{
				InstanceOfImpact = Instantiate(impactCrachat,Vector3(0,this.transform.position.y+0.05,this.transform.position.z-0.05),this.transform.rotation);
				InstanceOfImpact.transform.rotation.eulerAngles = Vector3(360,90,0);
				Destroy(InstanceOfImpact,1);
			}
			this.transform.position.y=-1000; // on se cache
		}
	}			

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}