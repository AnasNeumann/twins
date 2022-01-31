/* la classe qui control les déplacement et actions automatiques de la plante qui vole et donc la principale IA */
class PlanteMobileControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public var glace          : boolean        ; // est-ce que la plante est glacée
	public var cible          : GameObject     ; // la cible à suivre et a tuer (la petite fille)
	public var hit            : RaycastHit     ; // un rayon lancé pour trouver la fille
	public var textureGlace   : Texture2D      ; // la texture de glace.
	public var choixDirection : int       = 1  ; // la direction d'esquive des objets choisies aléatoirement
	public var timeChoix      : float     = 0.0; // le temps qui s'écoule entre un changement de choix
	public var obstacleH      : boolean        ; // est-ce qu'il y a un obstacle sur notre route ?
	public var obstacleV      : boolean        ; // est-ce qu'il y a un obstacle en haut ou en bas de nous ?
	public var coupEpee       : GameObject     ; // le Sprite Sheet du coup d'épée.
	public var attaqueTest    : boolean        ; // est-ce que la plante est en train d'attaquer la petite fille.
	public var timeDirection  : float          ; // le temps pendant lequel la plante avance sans changer de choix
	public var deplacementY   : float          ; // le déplacement sur l'axe Y que va éffectuer la plante mobile.
	public var deplacementZ   : float          ; // le déplacement sur l'axe Z que va éffectuer la plante mobile.
	public var dust           : GameObject     ; // la poussière qui apparait quand la plante meurs.
	public var _transform     : Transform      ; // le transform de la plante mobile
	public var _animation     : Animation      ; // le composant d'animation de la plante mobile. 

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lors du calcul de la toute première image */
	function  Start()
	{
		timeChoix=3; // on initialise la valeur 
		cible = GameObject.FindGameObjectWithTag("fary"); // la cible principale est la petite Soeur.
		this._transform = this.transform ; // on asigne la variable transform pour l'optimisation.
		this._animation = this.animation ; // on asigne la variable d'animation pour l'optimisation.
	}

	/* fonction éxécutée à chaque calcul d'une nouvelle frame avec régularisation des différence de temps entre chaque image */
	function FixedUpdate()
	{
		if (timeChoix>=5) // le temps est écoulé on change de choix
		{
			choixDirection=Random.Range(1,4); // on choisi entre les 4 direction possibles
			timeChoix=0; // on réinitialise le temps.
		}
		else  // si le temps n'est pas encore écoulé
		{
			timeChoix+=Time.deltaTime; // on incrémente le temps
		}
		/* si on est assez proche de la fille pour l'attaquer */
		if(Physics.Raycast(_transform.position,_transform.forward,hit,2) && glace==false)
		{
			if (hit.collider.tag=="fary") // si on voit la fille
			{
				attaque();   // on l'attaque 
			}
			else
			{
				networkView.RPC("idleRPC", RPCMode.AllBuffered);
				attaqueTest=false;
				move();
			}
		}
		/* sinon si rien ne se passe */
		else if(glace==false)
		{
			networkView.RPC("idleRPC", RPCMode.AllBuffered);
			attaqueTest=false;
			move();         // on éxécute move (le déplacement). 
		}
	}
	
	/* fonction éxécutée lorsque l'on touche un autre collider */
	function OnTriggerEnter (hit: Collider)
	{
		if (hit.gameObject.name=="glace_attack(Clone)") // si on se fait glacer
		{
			glace=true;
			networkView.RPC("glaceTexture", RPCMode.AllBuffered); // on éxécute le changement de texture
			die();
			Destroy(hit.gameObject); // on détruit la boule de glace
		}
		if(hit.gameObject.name=="sword" && GameObject.FindGameObjectWithTag("warrior").GetComponent(Animator).GetFloat("action")!=0) // si la collision est faite avec l'épée dans le bon sens
		{
			if(GameObject.Find("coup_epee(Clone)")==null) // si il n'y à pas de crachat
			{
				var ondeEpee : GameObject = Network.Instantiate(coupEpee,this.transform.position,this.transform.rotation,0);
			}
			glace=true;
			die();
		}
	}
	
	/* fonction calculée si notre objet touche un autre collider non trigger */
	function OnCollisionEnter(hit: Collision)
	{
		if(hit.gameObject.tag=="fary"  && attaqueTest==true)   // si la collision est faite avec la fille quand on attaque
		{
			networkView.RPC("diminuerVieRPC", RPCMode.AllBuffered);
		}
		if(this.glace==true) // si notre plante est morte et qu'elle touche le sol
		{
			this.GetComponent(BoxCollider).enabled = false; // on perd le collider
			Network.Instantiate(dust,this.transform.position,Quaternion(270,0,0,0),0); // la plante fait de la poussière en tombant
			networkView.RPC("DestroyRPC", RPCMode.AllBuffered); // on détruit l'objet après une segonde.
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//  FONCTIONS RPC
//______________________________________________________________________________________________________________________________________________________________

	@RPC
	function DestroyRPC()
	{
		Destroy(this.gameObject,1);                    // l'objet attaché ne vivra que "timeToLive" segondes.
	}
	
	@RPC 
	function idleRPC()
	{
		_animation.Play("idle");  // on joue l'animation d'attente et de mouvement ( c'est la même )
	}
	
	/* fonction qui fait baisser le niveau de vie de la fille */
	@RPC
	function diminuerVieRPC()
	{
		GameObject.FindGameObjectWithTag("fary").GetComponent(FairyControl).vie-=0.1; // la fille perd 1/10e de sa vie
		GameObject.Find("GUI_MAGE").GetComponent(GUIfaryBarreVie).nbrVie -= 1; // la barre de vie de la fille perd un point de vie
	}

	/* fonction éxécutée lorsque la plante meurs */
	function die()
	{
		attaqueTest=false;
		this.rigidbody.useGravity=true; // on reprend de la gravité (on tombe)
		this.GetComponent(Rigidbody).drag =0; // on ne resiste plus à la gravité
		this.GetComponent(Rigidbody).angularDrag =0.5; // on ne créer pas d'angle de collision
		if(_transform.rotation.eulerAngles == Vector3(0,0,0)) 
		{
			this.GetComponent(Rigidbody).AddForce(0,0,-150); // si le coupe viens de droite la plante est éjectée vers la gauche. 
		}
		else
		{
			this.GetComponent(Rigidbody).AddForce(0,0,150); // sinon si le coup venait de gauche, la plante est éjectée vers la droite.
		}
		networkView.RPC("dieRPC", RPCMode.AllBuffered);	
	}
	@RPC
	function dieRPC()
	{
		this.animation.Stop(); // arrête toute animation
		_transform.Find("c_global").transform.Find("bn_tete").transform.Find("bn_langue_1").transform.Find("bulle_Plante").GetComponent(ParticleSystemRenderer).enabled=false;// la plante n'emet plus de bulle
		_transform.Find("c_global").transform.Find("bn_tete").transform.Find("be_tete").transform.Find("helice").GetComponent(heliceControl).vie=false; // les hélices ne tournent plus
		Network.RemoveRPCs(this.networkView.viewID);   // on supprime les appel sur cette identifiant
		this.GetComponent(NetworkView).enabled=false;  // on supprime le networkView de la magie (chacun la voie sans synchronisation)
	}
	
	/* fonction éxécutée lors que la plante est gelée */
	@RPC
	function glaceTexture()
	{
		_transform.Find("melee_plant").GetComponent(SkinnedMeshRenderer).material.mainTexture = textureGlace;// on prend la texture de glace
		_transform.Find("c_global").transform.Find("bn_tete").transform.Find("be_tete").transform.Find("helice").GetComponent(MeshRenderer).material.mainTexture = textureGlace;// les hélices se glacent
	}
	
	/* fonction éxécutée lors ce que la plante attaque */
	function attaque()
	{
		networkView.RPC("attaqueRPC", RPCMode.AllBuffered);
		move();
		attaqueTest= true;
	}
	@RPC
	function attaqueRPC()
	{
		_animation.CrossFade("attack"); // on joue l'animation d'attaque
	}
	
	
	function move()
	{
		if(timeDirection>=1) // si le temps de choix de direction est écoulé
		{
			controlDirection(); // on change de direction.
			timeDirection = 0;  // on réinitialise la valeur du temps.
		}
		else  // sinon , on ne change pas de direction. 
		{
			timeDirection+=Time.deltaTime; // on incrémente le temps.
		}
		_transform.position.x=0;       // on freeze la position en x.
		/* on freeze la rotation selon la position de la fille par rapport à la plante */
		if(cible.transform.position.z>=this.transform.position.z) // si la fille est devant la plante
		{
			if(_transform.rotation.y>0) // si on est pas encore tourné vers la fille
			{
				_transform.rotation.y-=0.2; // on tourne progréssivement
				/* on freeze les deux autres rotations */
				_transform.rotation.x=0; 
				_transform.rotation.z=0; 
			}
			else
			{
				_transform.rotation.eulerAngles = Vector3(0,0,0); // la plante est tournée vers la fille
			}
		}
		else // sinon
		{
			if(_transform.rotation.y<180) // si on est pas encore tourné vers la fille
			{
				_transform.rotation.y+=0.2; // on tourne progréssivement
				/* on freeze les deux autres rotations */
				_transform.rotation.x=0; 
				_transform.rotation.z=0; 
			}
			else //sinon
			{
				_transform.rotation.eulerAngles = Vector3(0,180,0); // la plante est tournée vers la fille
			}
		}
		_transform.Translate(0,this.deplacementY*Time.deltaTime*choixDirection,this.deplacementZ*Time.deltaTime*choixDirection,Space.World); // la plante mobile se déplace
	}
	
	/* fonction de control des valeurs de déplacement de la plante si elle n'est pas morte et si elle n'attaque pas */
	function controlDirection()
	{	
		/* déplacement vers la droite si la plante est à droite sans être trop loin */
		if (cible.transform.position.z>=_transform.position.z && cible.transform.position.z<=_transform.position.z+10) // si la fille est à droite
		{
			if(cible.transform.position.y+0.6>_transform.position.y && cible.transform.position.y+0.6<=_transform.position.y+5) // si la fille est à droite et en haut
			{
				if(Physics.Raycast(_transform.position,_transform.forward,hit,0.7) && hit.collider.tag!="fary" && obstacleV==false) // si il y a un obstacle devant
				{
					this.deplacementY = 0.5 ; // on monte verticalement
					this.deplacementZ = 0.0 ; // on ne se déplace pas horizontalement
					obstacleH=true; // on a rencontrer un obstacle
				}
				else if (Physics.Raycast(_transform.position,Vector3.up,hit,1) && hit.collider.tag!="fary" && obstacleH==false)
				{
					this.deplacementY = 0.0 ; // on ne se déplace pas verticalement
					this.deplacementZ = 0.5 ; // on avance horizontalement
					obstacleV=true; // on a rencontrer un obstacle
				}
				else// sinon si il n'y a pas d'obstacle  ni devant ni en haut
				{
					this.deplacementY = 0.3 ; // on monte verticalement
					this.deplacementZ = 0.3 ; // on avance horizontalement
					obstacleV=false;
					obstacleH=false;
				}
			}
			else if(cible.transform.position.y+0.6<_transform.position.y && cible.transform.position.y+0.6>=_transform.position.y-5) // si la fille est à droite et en bas
			{
				if(Physics.Raycast(_transform.position,_transform.forward,hit,0.7) && hit.collider.tag!="fary" && obstacleV==false) // si il y a un obstacle devant
				{
					this.deplacementY =  0.5; // on monte verticalement
					this.deplacementZ =  0.0; // on ne se déplace pas horizontalement
					obstacleH=true;
				}
				else if (Physics.Raycast(_transform.position,Vector3.down,hit,1) && hit.collider.tag!="fary" && obstacleH==false)
				{
					this.deplacementY = 0.0 ; // on ne descend pas verticalement
					this.deplacementZ = 0.5 ; // on avance horizontalement
					obstacleV=true;
				}
				else // sinon si il n'y a pas d'obstacle  ni devant ni en haut
				{
					this.deplacementY = -0.3; // on descend verticalement
					this.deplacementZ =  0.3; // on avance horizontalement
					obstacleV=false;
					obstacleH=false;
				}
			}
			else if(cible.transform.position.y+0.6==_transform.position.y) // si la fille est juste à droite et à la même hauteur
			{
				if(Physics.Raycast(_transform.position,_transform.forward,hit,0.7) && hit.collider.tag!="fary") // si il y a un obstacle devant
				{
					this.deplacementY = 0.5 ; // on monte verticalement
					this.deplacementZ = 0.0 ; // on n'avance pas horizontalement
					obstacleH=true;
				}
				else // sinon si il n'y a pas d'obstacle  ni devant ni en haut
				{
					this.deplacementY = 0.0 ; // on ne se déplace pas verticalement
					this.deplacementZ = 0.5 ; // on avance horizontalement
					obstacleH=false;
					obstacleV=false;
				}
			}
		}
	
		/* déplacement vers la gauche si la plante est à droite sans être trop loin */
		if (cible.transform.position.z<_transform.position.z && cible.transform.position.z>=_transform.position.z-10) // si la fille est à gauche
		{
			if(cible.transform.position.y+0.6>_transform.position.y && cible.transform.position.y+0.6<=_transform.position.y+5) // si la fille est à gauche et en haut
			{
				if(Physics.Raycast(_transform.position,_transform.forward,hit,0.7) && hit.collider.tag!="fary" && obstacleV==false) // si il y a un obstacle devant
				{
					obstacleH=true;
					this.deplacementY = 0.5 ; // on monte verticalement
					this.deplacementZ = 0.0 ; // on n'avance pas horizontalement
				}
				else if (Physics.Raycast(_transform.position,Vector3.up,hit,1) && hit.collider.tag!="fary" && obstacleH==false)
				{
					obstacleV=true;
					this.deplacementY =  0.0; // on ne se déplace pas verticalement
					this.deplacementZ = -0.5; // on recule horizontalement
				}
				else // sinon si il n'y a pas d'obstacle  ni devant ni en haut
				{
					this.deplacementY =  0.3; // on se déplace verticalement
					this.deplacementZ = -0.3; // on recule horizontalement
					obstacleV=false;
					obstacleH=false;
				}
			}
			else if(cible.transform.position.y+0.6<_transform.position.y && cible.transform.position.y+0.6>=_transform.position.y-5) // si la fille est à gauche et en bas
			{
				if(Physics.Raycast(_transform.position,_transform.forward,hit,0.7) && hit.collider.tag!="fary" && obstacleV==false) // si il y a un obstacle devant
				{
					obstacleH=true;
					this.deplacementY =  0.5; // on monte verticalement
					this.deplacementZ =  0.0; // on ne se déplace pas horizontalement
				}
				else if (Physics.Raycast(_transform.position,Vector3.up,hit,1) && hit.collider.tag!="fary" && obstacleH==false)
				{
					this.deplacementY =  0.0; // on ne se déplace pas verticalement
					this.deplacementZ = -0.5; // on recule horizontalement
					obstacleV=true;
				}
				else // sinon si il n'y a pas d'obstacle  ni devant ni en haut
				{
					this.deplacementY = -0.3; // on descend verticalement
					this.deplacementZ = -0.3; // on recule horizontalement
					obstacleV=false;
					obstacleH=false;
				}
			}
			else if(cible.transform.position.y+0.6==_transform.position.y) // si la fille est juste à gauche et à la même hauteur
			{
				if(Physics.Raycast(_transform.position,_transform.forward,hit,0.7) && hit.collider.tag!="fary") // si il y a un obstacle devant
				{
					this.deplacementY = 0.5 ; // on monte verticalement
					this.deplacementZ = 0.0 ; // on ne se déplace pas horizontalement
					obstacleH=true;
				}
				else // sinon si il n'y a pas d'obstacle  ni devant ni en haut
				{
					this.deplacementY =  0.0; // on ne se déplace pas verticalement
					this.deplacementZ = -0.5; // on recule horizontalement
					obstacleV=false;
					obstacleH=false;
				}
			}
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}