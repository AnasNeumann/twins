/* Cette classe représente l'intéligence artificielle limitée des plantes fixes qui attaquent à distance*/
class PlanteFixeControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public var vie            : int         = 2;     // est-ce que la plante est en vie
	public var attaque        : GameObject;          // l'attaque que lance notre plante
	public var temps          : float       = 0;     // le temps entre chaque animation de tir
	public var sens           : boolean     = false; // le sens dans lequel est tourné la plante.
	public var coupEpee       : GameObject;          // le Sprite Sheet du coup d'épée.
 	public var move           : boolean;             // est-ce que la plante est congelée ? 
 	public var textureGlace   : Texture2D;           // la texture de glace.
	public var GlaceTime      : float;               // le temps pendant lequel la plante reste gelé.
	public var textureFeuille : Texture2D;       	 // la texture les feuilles
	public var Maintexture    : Texture2D;      	 // la texture de la plante
	public var dust           : GameObject;          // la poussière qui apparait quand la plante meurs.
	public var _animation     : Animation ;          // les animations de la plantes fixe
	public var _transform     : Transform ;          // le transform de la plante fixe.
//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________


	/* fonction éxécutée lors du calcul de la toute première frame */
	function Start()
	{
		vie              = 2                     ; // on initialise la vie a 2 coup 
		move             = true                  ; // la plante peut bouger
		var dieAnim      = this.animation["die"] ; // on cherche l'animation die
		dieAnim.wrapMode = WrapMode.Once         ; // on lui demande de ne pas se lire en boucle 
	}

	/* fonction calculée comme update() mais avec régularisation des différences de temps entre chaques frames */
	function FixedUpdate()
	{
		if(vie==0) // si on n'a plus de vie
		{
			die(); // on meurs
		}
		else if (move)// sinon , si on a encore de la vie
		{	
			var hit : RaycastHit; //un rayon 
		 	if(Physics.Raycast(Vector3(_transform.position.x,_transform.position.y+1,_transform.position.z),_transform.forward,hit,4))// si on touche un objet
		 	{
		 		if(hit.collider.tag=="fary") //si c'est la fille
		 		{
		 			attack(hit.collider.gameObject);//on attaque le personnage
		 		}
		 		else if (hit.collider.tag=="warrior") //si c'est le garcon
		 		{
		 			attack(hit.collider.gameObject);//on attaque le personnage
		 		}
		 		else//sinon si ce n'est pas un hero principal
		 		{
		 			idle();//on ne fait rien
		 		}
		 	}
		 	else if(Physics.Raycast(Vector3(_transform.position.x,_transform.position.y+0.2,_transform.position.z),_transform.forward,hit,4))// si on touche un objet
		 	{
		 		if(hit.collider.tag=="fary") //si c'est la fille
		 		{
		 			attack(hit.collider.gameObject);//on attaque le personnage
		 		}
		 		else if (hit.collider.tag=="warrior") //si c'est le garcon
		 		{
		 			attack(hit.collider.gameObject);//on attaque le personnage
		 		}
		 		else//sinon si ce n'est pas un hero principal
		 		{
		 			idle();//on ne fait rien
		 		}
		 	}
		 	else//sinon si on ne touche rien avec la sphère
		 	{
		 		idle();//on ne fait rien.
		 	}
		 	GlaceTime=0;
		}
		else 
		{
			if(GlaceTime <= 8.0)
			{
				GlaceTime+=Time.deltaTime;
			}
			else
			{
				degeler();
			}
		}
	}
	
	/* fonction éxécutée lorsque l'on touche un autre collider */
	function OnTriggerEnter (hit: Collider)
	{
		if(hit.gameObject.name=="sword" && GameObject.FindGameObjectWithTag("warrior").GetComponent(Animator).GetFloat("action")!=0) // si la collision est faite avec l'épée dans le bon sens
		{
			if (move) // si la plante n'est pas congelée
			{
				if(GameObject.Find("coup_epee_Horsligne(Clone)")==null) // si il n'y à pas de coup d'épée.
				{
					var ondeEpee : GameObject = Instantiate(coupEpee,Vector3(0,_transform.position.y+0.4,_transform.position.z),_transform.rotation);
				}
				vie--; // on a perdu de la vie
			}
			else // si la plante est congelée
			{
				explosion(); // la plante se casse en morceaux
			}
		}
		if (hit.gameObject.name=="glace_attack(Clone)") // si on se fait glace
		{
			glace();
			Destroy(hit.gameObject,0.1); // on détruit la boule de glace
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//  AUTRES FONCTIONS
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lors ce que la plante se fait geler par un pouvoir de glace */
	function  glace()
	{
		move=false;
		_animation.Stop();
		_transform.Find("distantPlant").GetComponent(SkinnedMeshRenderer).material.mainTexture = textureGlace;
		_transform.Find("bn1").transform.Find("bn2").transform.Find("bn3").transform.Find("leaf").GetComponent(MeshRenderer).material.mainTexture = textureGlace;
		_transform.Find("bn1").transform.Find("bn2").transform.Find("leaf").GetComponent(MeshRenderer).material.mainTexture = textureGlace;
		_transform.Find("ice_stalagmites").gameObject.GetComponent(MeshRenderer).enabled=true;
	}
	
	
	/* fonction éxécuté lors ce que la plante reprend sa forme initiale */
	function degeler()
	{
		move=true;
		_transform.Find("ice_stalagmites").gameObject.GetComponent(MeshRenderer).enabled=false;
		_transform.Find("distantPlant").GetComponent(SkinnedMeshRenderer).material.mainTexture = Maintexture;
		_transform.Find("bn1").transform.Find("bn2").transform.Find("bn3").transform.Find("leaf").GetComponent(MeshRenderer).material.mainTexture = textureFeuille;
		_transform.Find("bn1").transform.Find("bn2").transform.Find("leaf").GetComponent(MeshRenderer).material.mainTexture = textureFeuille;
	}
	
	/* fonction extecutée si il ne se passe rien */
	function idle()
	{
		_animation.Play("idle"); // on joue l'attente.
		temps=0; // on réinitialise le temps
	}
	
	/* fonction executée lorsqu'on croise un des deux héros */
	function attack(target : GameObject)
	{
		if (temps>=1) // si on peut tirer
		{
			_animation.CrossFade("attack");//on joue l'animation d'attaques
			time(); //on remet le temps à zero 
			yield WaitForSeconds(1.05); // on attends un peu 
			if(GameObject.Find("crachat(Clone)")==null) // si il n'y à pas de crachat
			{
				var crachat : GameObject;
				if (sens) // si on est tourné vers la droite
				{
					crachat = Instantiate(attaque,Vector3(0,_transform.position.y+0.5,_transform.position.z+0.2),_transform.rotation); // on tir 
				}
				else // sinon
				{
					crachat = Instantiate(attaque,Vector3(0,_transform.position.y+0.5,_transform.position.z-0.2),_transform.rotation); // on tir
				}
				crachat.GetComponent(CrachatControler).sens=sens; // on change le sens du crachat tiré.
			}
		}
		else //sinon on attends
		{
			_animation.Play("idle"); //on joue le idle avec une transition "crossFade"
			temps+=Time.deltaTime; // et on incrémente le temps temps avec le temps qui s'est écoulé lors du calcul de la dernière image.
		}
	}

	/* fonction executée lorsqu'on meurs */
	function die()
	{
		yield WaitForSeconds (0.3); // on attend le coup 
		networkView.RPC("playDieRPC", RPCMode.AllBuffered); // on appel la RPC de mort.
		yield WaitForSeconds(0.8); //on attend que la plante touche le sol
		if(GameObject.Find("Dust_ennemi(Clone)")==null) // si il n'y à pas de poussière
		{
			var dustInstantiate : GameObject = Network.Instantiate(dust,_transform.Find("distPlante_Dust").transform.position,_transform.Find("distPlante_Dust").transform.rotation,0); // la plante fait de la poussière en tombant
		}
		temps=0; // on remet le temps à zero
	}
	@RPC
	function playDieRPC()
	{
		_animation.Play("die");  // la plante joue l'animation de mort
		Network.RemoveRPCs(this.networkView.viewID);  // on supprime les appel sur cette identifiant
		this.GetComponent(NetworkView).enabled=false; // on supprime le networkView de la magie (chacun la voie sans synchronisation)
		Destroy(this.gameObject,1); //la plante disparait
	}
	
	
	/* fonction de réinitialisation du temps attendu avant un tir */
	function time()
	{
		yield WaitForSeconds(1);
		temps=0;
	}

	/* de création d'illusion de fragementation de la plante */
	function explosion()
	{
		if(GameObject.Find("coup_epee_Horsligne(Clone)")==null) // si il n'y à pas de sprite sheet de coup d'épée.
		{
			var ondeEpee : GameObject = Instantiate(coupEpee,Vector3(0,_transform.position.y+0.4,_transform.position.z),_transform.rotation);
		}
		yield WaitForSeconds (0.3); //on attend le coup 
		networkView.RPC("explosionRPC", RPCMode.AllBuffered); // on appel la RPC d'explosion.
	}
	@RPC
	function explosionRPC()
	{
		_transform.Find("distantPlant").GetComponent(SkinnedMeshRenderer).enabled = false; // la vraie plante disparait
	    _transform.Find("plant_tete").GetComponent(MeshRenderer).enabled          = true;  // la fausse tête seule apparait
		_transform.Find("tronc").GetComponent(MeshRenderer).enabled               = true;  // le faux corps seul apparait
		_transform.Find("plant_tete").GetComponent(BoxCollider).enabled           = true;  // le faux corps peut faire des collision (avec le sol le garcon et la fille)
		_transform.Find("tronc").GetComponent(BoxCollider).enabled                = true;  // la fausse tête aussi 
		_transform.Find("plant_tete").GetComponent(Rigidbody).useGravity          = true;  // la fausse tête tombe avec la gravité
		_transform.Find("plant_tete").GetComponent(Rigidbody).AddForce(0,300,0);           // la fausse tête saute en l'air avant de tomber par terre
		_transform.Find("tronc").GetComponent(Rigidbody).useGravity               = true;  // le faux corps tombe directement par terre
		_transform.Find("bn1").transform.Find("bn2").transform.Find("bn3").transform.Find("leaf").GetComponent(MeshRenderer).enabled = false; // la 1e feuille disparait
		_transform.Find("bn1").transform.Find("bn2").transform.Find("leaf").GetComponent(MeshRenderer).enabled                       = false; // la 2eme feuille disparait.
		Network.RemoveRPCs(this.networkView.viewID);  // on supprime les appel sur cette identifiant
		this.GetComponent(NetworkView).enabled=false; // on supprime le networkView de la magie (chacun la voie sans synchronisation)
		Destroy(this.gameObject,2); //la plante disparait
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}