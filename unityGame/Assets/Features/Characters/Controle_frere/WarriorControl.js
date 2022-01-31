/* la classe qui controle les déplacements et actions du personnage principal frere (warrior) */
class WarriorControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public  var speedWalk       : float   = 2.2   ; // la vitesse de marche du garcon
	public  var vie             : float   = 1     ; // le niveau entre 0.0 -> 1.0 de vie du personnage.
	public  var sensRotation    : boolean = true  ; // le sens dans lequel il est tourné
	public  var aTerre          : boolean         ; // est-on au sol ? 
	public  var phaseTransition : boolean = false ; // est-ce que le garcon est en train de tourné ou non ? 
	public  var rochet          : GameObject      ; // le rochet qui essai d'écraser le garcon
	public  var rochetTest      : boolean = false ; // est-ce qu'on à déjà poussé le rochet ou pas encore. 
	public  var _transform      : Transform       ; // this.transform  
	public  var _rigidbody      : Rigidbody       ; // this.rigidbody
	public  var _animator       : Animator        ; // le composant mecanim

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction calculée lors de l'appel du script donc tout au début même avant Start */
	function Awake()
	{
		// DontDestroyOnLoad(this); // Ne pas détruire ce composant car il doit y avoir réseaux meme après avoir chargé un niveau
	}

	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start()
	{
		/* on renome l'objet avec le pseudo du joueur. */
		var nom : String = UserPref.getUser();
		networkView.RPC("envoyerNomRPC", RPCMode.AllBuffered,nom);
		phaseTransition=false; // on initialise la transition a faux.
		this.rochet = GameObject.Find("RochetPiege(Clone)"); // on trouve le rochet.

		/* on initialise les variables */
		this._transform = this.transform ;
		this._rigidbody = this.rigidbody ;
		this._animator = this.GetComponent(Animator);		
	}

	/* Executée comme update mais avec un controle des différences de temps entre chaque frames */		
	function FixedUpdate()
	{
		clavier();  //les touches appuiées 
		controle(); //controle sur les positions , rotation et niveau de vie
	}

	/* fonction calculée quand une collision entre notre objet et un autre collider prend fin */
	function OnCollisionExit(collisionInfo : Collision)
	{
		if(collisionInfo.gameObject.tag=="sol") //si on n'est plus en collision avec le sol
		{
			aTerre = false; // on n'est plus à terre.
			_animator.SetFloat("hauteur",1.0); // on joue l'animation sauter
		}
	}

	/* fonction calculée si notre objet touche un autre collider non trigger */
	function OnCollisionEnter(hit: Collision)
	{
		if(hit.gameObject.tag == "sol") // si la collision est faite avec le sol
		{
			aTerre = true ; // on est à terre.
			_animator.SetFloat("hauteur",0.0); // on joue l'animation idle
		}
		else if(hit.gameObject.tag=="water") // si la collision est faite avec le fond de l'eau
		{
			this.vie = 0 ; // on est mort
			networkView.RPC("diminuerVieTotal", RPCMode.AllBuffered); // on appel la RPC pour la barre de vie
		}
		if (hit.gameObject.name=="flecheAttaque(Clone)") // si le garcon touche une des fleches piégée
		{
			this.vie -= 0.1 ; // le garcon perd de la vie.
			networkView.RPC("diminuerVie", RPCMode.AllBuffered); // on appel la RPC pour la barre de vie
		}
		if (hit.gameObject.name=="RochetPiege(Clone)" && hit.gameObject.GetComponent(Rigidbody).velocity.z>1 && this.transform.position.z>=hit.gameObject.transform.position.z )
		{
			// si on touche un rochet qui tombe naturellement et qu'on se trouve devant lui
			this.vie = 0 ; // le garcon meurs écrasé. 
			networkView.RPC("diminuerVieTotal", RPCMode.AllBuffered); // on appel la RPC pour la barre de vie
		}
		if (hit.gameObject.name=="rochetCreator" && this.rochetTest == false ) // si on touche l'emplacement de tombée de rochet pour la première fois.
		{
			this.rochetTest = true ; // le rochet est tombé. il ne sera plus poussé.
			this.rochet.GetComponent(Rigidbody).AddForce(0,0,200000); // on pousse le rochet pour qu'il avance.
		}
		if(hit.gameObject.tag=="facade") // si je me cogne contre une facade d'une plateforme volante
		{
			if(hit.gameObject.transform.position.z > _transform.position.z) // verification du sens de tombée
			{
				_rigidbody.AddForce(0,-50,-75); // je tombe
			}
			else
			{
				_rigidbody.AddForce(0,-50,75); // je tombe
			}
		}
		else if(hit.gameObject.tag=="facadeSol" && this.aTerre == false) // si je me cogne contre une facade normale et que je ne suis pas au sol
		{
			if(hit.gameObject.transform.position.z > _transform.position.z) // verification du sens de tombée
			{
				_rigidbody.AddForce(0,-50,-75); // je tombe
			}
			else
			{
				_rigidbody.AddForce(0,-50,75); // je tombe
			}
		}
		else if(hit.gameObject.name=="crachat(Clone)") // si on rentre dans un crachat.
		{
			if (_animator.GetFloat("protection")==0 || this.sensRotation==hit.gameObject.GetComponent(CrachatControler).sens) // si il ne se protegait pas dans le bon sens
			{				
				this.vie-=0.1; // on perd de la vie.
				networkView.RPC("diminuerVie", RPCMode.AllBuffered); // on appel la RPC de perte de vie.
			}

		}
	}
	
	/* fonction calculée si notre objet reste en collision avec un autre collider non trigger */
	function OnCollisionStay(hit: Collision)
	{
		if(hit.gameObject.tag=="sol") // si la collision est faite avec le sol
		{
			aTerre = true; // on est à terre.
		}
		if(hit.gameObject.tag=="facade") // si je me cogne contre une facade d'une plateforme volante
		{
			if(hit.gameObject.transform.position.z > _transform.position.z) // verification du sens de tombée
			{
				_rigidbody.AddForce(0,-50,-75); // je tombe
			}
			else
			{
				_rigidbody.AddForce(0,-50,75); // je tombe
			}
		}
		else if(hit.gameObject.tag=="facadeSol" && this.aTerre == false) // si je me cogne contre une facade normale et que je ne suis pas au sol
		{
			if(hit.gameObject.transform.position.z > _transform.position.z) // verification du sens de tombée
			{
				_rigidbody.AddForce(0,-50,-75); // je tombe
			}
			else
			{
				_rigidbody.AddForce(0,-50,75); // je tombe
			}
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//  FONCTIONS PRINCIPALE
//______________________________________________________________________________________________________________________________________________________________

	/* fonction d'envoi du nom sur le réseau */
	@RPC
	function envoyerNomRPC(newValue : String)
	{
		this.name=newValue;
	}

	/* fonction qui appelle les autres selon la touche ou le bouton appuyé */
	function clavier()
	{
		if (Input.GetKey("d") || Input.GetKey("right"))//si j'appui sur la touche droite
		{
			if(_animator.GetFloat("action")==0) // si on ne tape pas
			{
				deplacementDroite();// on envoi la RPC de déplacement
			}
		}
		else if (Input.GetKey("q") || Input.GetKey("left"))//si j'appui sur la touche gauche
		{
			if(_animator.GetFloat("action")==0) // si on ne tape pas
			{
				deplacementGauche(); // on envoi la RPC de déplacement
			}
		}
		else //si je ne fait rien du tout
		{
			networkView.RPC("idle", RPCMode.AllBuffered); // on appel la RPC d'attente.
		}

		if(Input.GetButton("Jump") || Input.GetKeyDown("up") )// si j'appui sur la barre espace
		{
			if (aTerre==true && _animator.GetFloat("hauteur")==0) //et que je suis à terre
			{
				jump();// je saute et appel la RPC de saut.
			}
		}
		else //sinon
		{
			networkView.RPC("idleJump", RPCMode.AllBuffered); // on appel la RPC d'attente
		}
	
		if(Input.GetButtonUp("Fire1"))// Si on appui sur le bouton gauche de la souris
		{
			attack(); //on appel la RPC d'attaque.
		}
		
		else if(Input.GetButtonDown("Fire2"))// si on appui sur le bouton droit de la souris.
		{
			defense(); //on appel la RPC de défense.
		}
		else if(Input.GetButtonUp("Fire2"))// si on relache le bouton droit de la souris.
		{
			networkView.RPC("stopDefense", RPCMode.AllBuffered); // on arrete de se proteger.
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//  FONCTIONS RPC
//______________________________________________________________________________________________________________________________________________________________

	/* fonction envoyée sur le réseau lorsque l'on se déplace vers la droite */	
	function deplacementDroite()
	{
		networkView.RPC("deplacementDroiteRPC", RPCMode.AllBuffered);
		if (!sensRotation) //si on est pas encore tourné vers la droite
		{
			this.phaseTransition = true;
			sensRotation=true; // on se tourne
		}
		_transform.Translate(0,0,speedWalk*Time.deltaTime,Space.World); //on avance
	}
	@RPC
	function deplacementDroiteRPC()
	{
		_animator.SetFloat("protection",0); //en arrete de se protéger
		_animator.SetFloat("vitesse",1.0); //on joue l'animation de déplacement
	}

	
	/* fonction envoyée sur le réseau lorsqu'on se déplace vers la gauche */
	function deplacementGauche()
	{
		networkView.RPC("deplacementGaucheRPC", RPCMode.AllBuffered);
		if (sensRotation) // si on n'est pas dans le bon sens
		{
			this.phaseTransition = true;
			sensRotation=false; // on se tourne.
		}
		_transform.Translate(0,0,-1*speedWalk*Time.deltaTime,Space.World); // on avance
	}
	@RPC
	function deplacementGaucheRPC()
	{
		_animator.SetFloat("protection",0); //on arrete de se proteger
		_animator.SetFloat("vitesse",1.0); // on joue l'animation de marche.
	}
	
	/* fonction envoyée sur le réseau quand on arrete de marcher */
	@RPC
	function idle()
	{
		_animator.SetFloat("vitesse",0); // on joue l'animation idle
	}
	
	/* fonction envoyée sur le réseau */
	function jump()
	{
		aTerre=false;
		networkView.RPC("jumpRPC", RPCMode.AllBuffered);
		yield WaitForSeconds(0.1); // on attend le temps du début du saut
		_rigidbody.AddForce(0,1000,0); //on apllique la force de saut.
	}
	@RPC
	function jumpRPC()
	{
		_animator.SetFloat("vitesse",0); // on arrete d'avancer
		_animator.SetFloat("protection",0); // on arrete de se proteger
		_animator.SetFloat("hauteur",1.0);  // on joue l'animation sauter
	}
	
	/* fonction envoyée sur le réseau l'orsqu'on arrete de sauter */
	@RPC
	function idleJump()
	{
		_animator.SetFloat("hauteur",0);// on joue l'animation d'attente.
	}
	
	/* fonction envoyéee sur le réseau quand on attaque */
	function attack()
	{
		if (aTerre==true)
		{
			networkView.RPC("attackRPC", RPCMode.AllBuffered);
			GameObject.Find("sword").GetComponent(TrailRenderer).enabled=true;
		}
		yield WaitForSeconds(0.6);
		networkView.RPC("finAttackRPC", RPCMode.AllBuffered);
		GameObject.Find("sword").GetComponent(TrailRenderer).enabled=false;
	}
	@RPC
	function attackRPC()
	{
		_animator.SetFloat("protection",0);
		_animator.SetFloat("action",1);
	}
	@RPC
	function finAttackRPC()
	{
		_animator.SetFloat("action",0);
	}
	
	
	/* fonction envoyée sur le réseau pour se défendre */
	function defense()
	{
		if (_animator.GetFloat("vitesse")==0 && _animator.GetFloat("hauteur")==0) // si on ne bouge pas
		{
			networkView.RPC("defenseRPC", RPCMode.AllBuffered);
		}
	}
	@RPC
	function defenseRPC()
	{
		_animator.SetFloat("protection",1); //on joue l'animation de défense.
	}
	
	/* fonction envoyée sur le réseau pour jouer l'animation d'arret de défense */
	@RPC
	function stopDefense()
	{
		_animator.SetFloat("protection",0); // on revient en transition à l'animation idle.
	}
		
	/* RPC de controle de la position et rotation */
	function controle()
	{
		if (vie<=0) // si on a plus de vie
		{
			networkView.RPC("dieRPC", RPCMode.AllBuffered);
			GameObject.Find("cameraFairy").GetComponent(CameraFrere).enabled = false ; // la caméra ne nous suit plus
			yield WaitForSeconds (1);
			this.vie = 1 ; // on reprend toute nos vies (10).
			networkView.RPC("resurectionRPC", RPCMode.AllBuffered);
			_transform.position = Vector3(0,1,3);
			yield WaitForSeconds (1);
			GameObject.Find("cameraFairy").GetComponent(CameraFrere).enabled = true ; // la caméra nous suit de nouveau
		}
		/* on controle les rotation si le garcon n'est pas en train de tourné */
		if (!this.phaseTransition)
		{
			if (sensRotation) // si on est tourné vers la droite
			{
				_transform.rotation.eulerAngles = Vector3(0,0,0); // on freeze les rotations
			}	
			else // sinon 
			{
				_transform.rotation.eulerAngles = Vector3(0,180,0); //on freeze les rotations
			}
		}
		else /* sinon si le frere est en phase de transition */
		{
			if(_transform.rotation.y>0 && sensRotation) // si on n'est pas encore tourné dans le bon sens (droite)
			{
				_transform.rotation.y-=0.4;
			}
			else if (_transform.rotation.y<=0 && sensRotation)//sinon 
			{
				this.phaseTransition = false;
			}
			if(_transform.rotation.y<180 && !sensRotation)// si on n'est pas encore tourné dans le bon sens (gauche)
			{
				_transform.rotation.y+=0.4;			
			}
			else if (_transform.rotation.y>=180 && !sensRotation)//sinon 
			{
				this.phaseTransition = false;
			}
		}
		_transform.position.x=0; // on controle la position en profondeur toujours nul
	}
	@RPC
	function dieRPC() // on envoi l'animation de mort
	{
		_animator.SetFloat("vie",0); // on meurs 
	}

	@RPC
	function resurectionRPC() // on reprend l'animation idle
	{
		_animator.SetFloat("vie",1); // on ne meurs plus
		GameObject.Find("GUI_WARRIOR").GetComponent(GUIfaryBarreVie).nbrVie = 10; // on reprend toute la barre de vie
	}

	@RPC
	function diminuerVie()
	{
		_animator.SetFloat("protection",0); // il perd sa protection
		GameObject.Find("GUI_WARRIOR").GetComponent(GUIfaryBarreVie).nbrVie -= 1; // on perd un point de vie 
	}

	@RPC
	function diminuerVieTotal()
	{
		_animator.SetFloat("protection",0); // il perd sa protection
		GameObject.Find("GUI_WARRIOR").GetComponent(GUIfaryBarreVie).nbrVie = 0; // on perd toute la barre de vie 
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}