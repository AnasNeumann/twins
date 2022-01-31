/* La classe qui permet de controler les déplacements et actions éfectués par la soeur(Fairy) */
class FairyControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public var sensRotation          : boolean = true;   // le sens dans lequel elle est tournée
	public var speedFly              : float   = 2.2;    // la vitesse de vol de la fille
	public var vie                   : float   = 1;      // le niveau entre 0.0 -> 1.0 de vie du personnage.
	public var move                  : boolean = true;   // si on peut se déplacer ou pas.
	public var magie                 : GameObject;       // le flux magique quand on crée un cube
	public var magieCube             : GameObject;       // le flux magique quand on déplace un cube
	public var coupGlace             : GameObject;       // l'effet du septre lorsque l'on lance un sort.
	public var glaceAttack           : GameObject;       // l'attaque de glace qui gèle les enemis. 
	public var teleportationParticle : GameObject;       // le système de particules qui apparait 2 fois lorsqu'on se téléporte
	public var PlanteMobile          : GameObject;       // la plante mobile qui se créer pour attaquer la fille.
	public var magieRochet           : GameObject;       // le systeme de particule qui doit suivre le rochet quand on le déplace
	public var bullePlante           : GameObject;       // le systeme de particule qui cache l'apparition des plantes volantes
	public var _transform            : Transform;        // le transform de la fille.
	public var _animator             : Animator;         // le composant d'animation de la fille
	public var wings1                : GameObject;       // une aile 
	public var wings2                : GameObject;       // une aile
	public var wings3                : GameObject;       // une aile
	public var wings4                : GameObject;       // une aile

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
	}
			
	/* Executée comme update mais avec un controle des différences de temps entre chaque frames */		
	function FixedUpdate()
	{
		clavier();  // les touches appuiées
		controle(); // controle sur les positions , rotation et niveau de vie
	}

	/* fonction éxécutée lorsque l'on touche un autre collider */
	function OnTriggerEnter (hit: Collider)
	{
		if (hit.gameObject.name=="PlanteCreator") // si on entre dans une zone de création de plante volante
		{
			Network.Instantiate(this.bullePlante,Vector3(0,hit.transform.position.y+1,hit.transform.position.z),hit.transform.rotation,0); // on fait apparaitre des bulles pour cacher l'apparition des plantes
			Network.Instantiate(this.bullePlante,Vector3(0,hit.transform.position.y+2,hit.transform.position.z),hit.transform.rotation,0); // on fait apparaitre des bulles pour cacher l'apparition des plantes
			yield WaitForSeconds(0.4); // on attend.
			Destroy (hit.gameObject); // on détruit le créateur de plante d'attaque corps à corps.
			Network.Instantiate(PlanteMobile,Vector3(0,hit.transform.position.y+1,hit.transform.position.z),hit.transform.rotation,0); // on créer une plante
			Network.Instantiate(PlanteMobile,Vector3(0,hit.transform.position.y+2,hit.transform.position.z),hit.transform.rotation,0); // on créer une plante
		}
	}

	/* fonction calculée si notre objet touche un autre collider non trigger */
	function OnCollisionEnter(hit: Collision)
	{
		if(hit.gameObject.tag=="water") // si la collision est faite avec le fond de l'eau
		{
			this.vie=0; // on est mort
			networkView.RPC("diminuerVieTotal", RPCMode.AllBuffered); // on appel la RPC de perte de toute la vie
		}
		if (hit.gameObject.name=="flecheAttaque(Clone)") // si la fille touche une des fleches piégée
		{
			this.vie-=0.1; // la fille perd de la vie.
			networkView.RPC("diminuerVie", RPCMode.AllBuffered); // on appel la RPC de perte de vie.
		}
		else if(hit.gameObject.name=="crachat(Clone)") // si on rentre dans un crachat.
		{
			this.vie-=0.1; // on perd de la vie.
			networkView.RPC("diminuerVie", RPCMode.AllBuffered); // on appel la RPC de perte de vie.
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//  FONCTIONS PRINCIPALE
//______________________________________________________________________________________________________________________________________________________________

	function clavier()
	{
		if (move) // si on peut se déplacer
		{
			if (Input.GetKey("d") || Input.GetKey("right"))//si j'appui sur la touche droite
			{
				if (Input.GetKey("z") || Input.GetKey("up"))//si j'appui sur la touche haut
				{
					deplacementHautDroit(); // on envoi la RPC de déplacement
				}
				else if (Input.GetKey("s") || Input.GetKey("down"))//si j'appui sur la touche bas
				{
					deplacementBasDroit(); // on envoi la RPC de déplacement
				}
				else
				{
					deplacementDroite();// on envoi la RPC de déplacement
				}
				inclineDroit();
				networkView.RPC("speed", RPCMode.AllBuffered); // on appel la RPC de vol.
			}
			else if (Input.GetKey("q") || Input.GetKey("left"))//si j'appui sur la touche gauche
			{
				if (Input.GetKey("z") || Input.GetKey("up"))//si j'appui sur la touche haut
				{
					deplacementHautGauche(); // on envoi la RPC de déplacement
				}
				else if (Input.GetKey("s") || Input.GetKey("down"))//si j'appui sur la touche bas
				{
					deplacementBasGauche(); // on envoi la RPC de déplacement
				}
				else
				{
					deplacementGauche(); // on envoi la RPC de déplacemen
				}
				inclineDroit();
				networkView.RPC("speed", RPCMode.AllBuffered); // on appel la RPC de vol.
			}
			else if (Input.GetKey("z") || Input.GetKey("up"))//si j'appui sur la touche haut
			{
				deplacementHaut(); // on envoi la RPC de déplacement
				networkView.RPC("speed", RPCMode.AllBuffered); // on appel la RPC de vol.
			}
			else if (Input.GetKey("s") || Input.GetKey("down"))//si j'appui sur la touche bas
			{
				deplacementBas(); // on envoi la RPC de déplacement
				networkView.RPC("speed", RPCMode.AllBuffered); // on appel la RPC de vol.
			}
			else //si je ne fait rien du tout
			{
				networkView.RPC("idle", RPCMode.AllBuffered); // on appel la RPC d'attente.
				redresse();
			}
		}

		if(Input.GetButtonDown("Fire1") && this.GetComponent(Animator).GetFloat("action")!=1)
		{
			networkView.RPC("attack", RPCMode.AllBuffered); // on appel la RPC de lancement un sort
			power(); // on fait l'instanciation d'un cube.
		}
		else if (Input.GetButtonUp("Fire1")) //si j'appui sur le bouton gauche de la souris
		{
			networkView.RPC("stopAttack", RPCMode.AllBuffered); // on appel la RPC d'arret de lancement un sort
			move=true; // on peut bouger de nouveau
		}
		if (Input.GetButtonUp("Fire2")) // si on appui puis relache le bouton droit de la souris.
		{
			teleportation();//on se téléporte à la position de la souris sur la scène.
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//  FONCTIONS RPC
//______________________________________________________________________________________________________________________________________________________________

	/* fonction d'envoi du nom sur le réseau */
	@RPC
	function envoyerNomRPC(newValue : String)
	{
		this.name=newValue;
	}


	/* Quand je me déplace vers la droite */
	function deplacementDroite()
	{
		if(sensRotation) // si je suis déjà tourné vers la droite.
		{
			_transform.Translate(0,0,speedFly*Time.deltaTime,Space.World); // on avance;
		}
		else // sinon 
		{
			sensRotation=true; // on se tourne
		}
	}

	/* Quand je me déplace vers la gauche */
	function deplacementGauche()
	{
		if(sensRotation) // si je suis tourné vers la droite 
		{
			sensRotation=false; //je me tourne
		}
		else // sinon 
		{
			_transform.Translate(0,0,-1*speedFly*Time.deltaTime,Space.World); // on avance
		}
	}

	/* Quand je me déplace vers le haut */
	function deplacementHaut()
	{
		_transform.Translate(0,speedFly*Time.deltaTime,0,Space.World); // on monte
	}

	/* Quand je me déplace vers le bas */
	function deplacementBas()
	{
		_transform.Translate(0,-1*speedFly*Time.deltaTime,0,Space.World); // on déscend
	}

	/* Quand je monte vers la droite */
	function deplacementHautDroit()
	{
		if(sensRotation) // si je suis déjà tourné vers la droite 
		{
			_transform.Translate(0,speedFly*Time.deltaTime,speedFly*Time.deltaTime,Space.World); // on avance
		}
		else // sinon 
		{
			sensRotation=true; // on se tourne
		}
	}

	/* Quand je vais en bas vers la droite */
	function deplacementBasDroit()
	{
		if(sensRotation) // si on est déjà tourné vers la droite.
		{
			_transform.Translate(0,-1*speedFly*Time.deltaTime,speedFly*Time.deltaTime,Space.World); // on avance
		}
		else // sinon 
		{
			sensRotation=true; // on se tourne.
		}
	}

	/* Quand je me déplace en haut vers la gauche */
	function deplacementHautGauche()
	{
		if(sensRotation) // si je suis tourné vers la droite .
		{
			sensRotation=false; // je me tourne.
		}
		else // sinon 
		{
			_transform.Translate(0,speedFly*Time.deltaTime,-1*speedFly*Time.deltaTime,Space.World); // on avance
		}
	}

	/* Quand je me déplace vers le bas à gauche */
	function deplacementBasGauche()
	{
		if(sensRotation) // si je suis tourné vers la droite. 
		{
			sensRotation=false; // je me tourne 
		}
		else // sinon 
		{
			_transform.Translate(0,-1*speedFly*Time.deltaTime,-1*speedFly*Time.deltaTime,Space.World); // on avance
		}
	}

	/* Quand on attend */
	@RPC
	function idle()
	{
		/* toutes les ailes bougent lentement */
		wings1.animation.Play("slow");
		wings2.animation.Play("slow");
		wings3.animation.Play("slow");
		wings4.animation.Play("slow");
	}

	/* Quand je suis en mouvement */
	@RPC
	function speed()
	{
		/* Toutes les ailes bougent plus vite */
		wings1.animation.Play("speed");
		wings2.animation.Play("speed");
		wings3.animation.Play("speed");
		wings4.animation.Play("speed");	
	}

	/* Quand on se déplace */
	function inclineDroit()
	{
		var newRotationY : float;
		if (sensRotation) // si on est tourné vers la droite
		{
			if (_transform.rotation.y<=0) // si on déjà tourné dans le bon sens.
			{
				_transform.rotation.eulerAngles = Vector3(20,0,0); // je me penche
			}
			else // sinon si on est pas encore tourné dans le bon sens
			{
				newRotationY = _transform.rotation.eulerAngles.y-20;
				_transform.rotation.eulerAngles = Vector3(20,newRotationY,0); // je me penche
			}
		}
		else if(!sensRotation) 
		{
			if(_transform.rotation.eulerAngles.y>=180)  // si on est déjà tourné dans le bon sens
			{
				_transform.rotation.eulerAngles = Vector3(20,180,0); // je me penche et je tourne
			}
			else // sinon si on est pas encore tourné dans le bon sens
			{
				newRotationY = _transform.rotation.eulerAngles.y+20;
				_transform.rotation.eulerAngles = Vector3(20,newRotationY,0); // je me penche
			}
		}
	}

	/* Si je ne suis pas en mouvement horyzontal mais seuelement vertical */
	function redresse()
	{
		if (sensRotation) // si on est tourné vers la droite
		{
			_transform.rotation.eulerAngles = Vector3(0,0,0); // je reste droit
		}
		else // sinon 
		{
			_transform.rotation.eulerAngles = Vector3(0,180,0); // je reste droit dans l'autre sens.
		}
	}

	/* Si je lance un sort */
	@RPC
	function attack()
	{
		_animator.SetFloat("action",1); // je joue l'animation 
	}

	/* si j'ai fini mon sort */
	@RPC
	function stopAttack()
	{
		_animator.SetFloat("action",0); // je joue l'animation d'arret de sort
	}

	/* fonction de controle du niveau de vie de la fille */
	function controle()
	{
		_transform.position.x=0;  // on controle la position en profondeur toujours nul
		if (vie<=0) // si on a plus de vie
		{
			//this.GetComponent(BoxCollider).enabled=false; // on n'a plus de collision 
			this.GetComponent(Rigidbody).useGravity=true; // la gravité nous affecte
			this.GetComponent(Rigidbody).drag = 0 ; // on ne resiste plus à la gravité
			this.GetComponent(Rigidbody).angularDrag = 0 ; // on ne créer pas d'angle de collision
			//this.enabled=false; // on arrete se script
			GameObject.Find("cameraFairy").GetComponent(CameraSoeur).enabled=false; // la caméra ne nous suit plus.
			yield WaitForSeconds (0.8);
			this.vie = 1 ; // on reprend toute nos vies (10).
			networkView.RPC("resurectionRPC", RPCMode.AllBuffered);
			_transform.position = Vector3(0,1,3) ;
			this.GetComponent(Rigidbody).useGravity = false ; // la gravité ne nous affecte plus
			this.GetComponent(Rigidbody).drag = 1090 ; // on reprend la valeur de base .
			this.GetComponent(Rigidbody).angularDrag = 1182 ; // on reprend la valeur de base.
			yield WaitForSeconds (0.3) ;
			GameObject.Find("cameraFairy").GetComponent(CameraSoeur).enabled = true ; // la caméra nous suit de nouveau 
		}
	}

	@RPC
	function dieRPC() // on envoi l'animation de mort
	{
		_animator.SetFloat("vie",0); // on meurs
	}

	@RPC
	function resurectionRPC() // on reprend l'animation idle
	{
		_animator.SetFloat("vie",1); // on meurs
		GameObject.Find("GUI_MAGE").GetComponent(GUIfaryBarreVie).nbrVie = 10; // on reprend toute la barre de vie
	}

	@RPC
	function diminuerVie()
	{
		GameObject.Find("GUI_MAGE").GetComponent(GUIfaryBarreVie).nbrVie -= 1; // on perd un point de vie 
	}

	@RPC
	function diminuerVieTotal()
	{
		GameObject.Find("GUI_MAGE").GetComponent(GUIfaryBarreVie).nbrVie = 0; // on perd toute la barre de vie 
	}

	/* la création d'un cube à instancier et autres pouvoirs */
 	function power()
	{
		if (Input.GetMouseButtonDown(0)) // si on appui avec la souris sur le cube
		{
			move=false;// on ne peut plus se déplacer
			var rayHit : RaycastHit; //l'objet touché par le rayon
			var rayMouse = GameObject.Find("cameraFairy").GetComponent(Camera).ScreenPointToRay(Input.mousePosition); // le rayon est lancé de la caméra à la position de la souris
			if(Physics.Raycast(rayMouse,rayHit)) // on lance un rayon depuis la caméra sur l'impact entre la souris et ...
			{
				if(rayHit.collider.name=="viseur") //le viseur
				{
					/* on oriente la fille vers le ciel dans les deux cas sur 4 ou elle ne l'est pas. */
					if(rayHit.point.z>_transform.position.z && !sensRotation)
					{
						sensRotation=true;
						_transform.rotation.eulerAngles = Vector3(0,0,0); // je reste droit
					}
					else if(rayHit.point.z<_transform.position.z && sensRotation)
					{
						sensRotation=false;
						_transform.rotation.eulerAngles = Vector3(0,180,0); // je reste droit
					}
					Network.Instantiate(magie,rayHit.point,_transform.rotation,0); // on instancie le pouvoir magique
				}
				if(rayHit.collider.name=="cube(Clone)") //un cube
				{
					/* on oriente la fille vers le cube dans les deux cas sur 4 ou elle ne l'est pas. */
					if(rayHit.point.z>_transform.position.z && !sensRotation)
					{
						sensRotation=true;
						_transform.rotation.eulerAngles = Vector3(0,0,0); // je reste droit
					}
					else if(rayHit.point.z<_transform.position.z && sensRotation)
					{
						sensRotation=false;
						_transform.rotation.eulerAngles = Vector3(0,180,0); // je reste droit
					}
					Network.Instantiate(magieCube,rayHit.point,_transform.rotation,0); // on instancie le pouvoir magique
				}
				if(rayHit.collider.name=="distant_plant" || rayHit.collider.name=="plante" || rayHit.collider.name=="plante(Clone)") // un ennemi
				{
					/* on oriente la fille vers la plante dans les deux cas sur 4 ou elle ne l'est pas. */
					if(rayHit.collider.transform.position.z>_transform.position.z && !sensRotation)
					{
						sensRotation=true;
						_transform.rotation.eulerAngles = Vector3(0,0,0); // je reste droit
					}
					else if(rayHit.collider.transform.position.z<_transform.position.z && sensRotation)
					{
						sensRotation=false;
						_transform.rotation.eulerAngles = Vector3(0,180,0); // je reste droit
					}
					var spetreBout : GameObject = GameObject.Find("spetreBout");
					Network.Instantiate(coupGlace,spetreBout.transform.position,spetreBout.transform.rotation,0);// on instancie le pouvoir magique
					var glaceAttackInstance  : GameObject = Network.Instantiate(glaceAttack,spetreBout.transform.position,spetreBout.transform.rotation,0);// on instancie l'attaque de glace
					glaceAttackInstance.transform.LookAt(rayHit.collider.transform); // on oriente la glace vers la plante
				}
				if(rayHit.collider.name=="GlaceCreator" ) // si je touche l'eau ou l'on instancie les blocs de glaces
				{
					if (rayHit.collider.gameObject.GetComponent(GlaceCreatorControl).creation == true ) // si il n'y  a pas déjà un blocs de glace
					{
						/* on oriente la fille vers l'eau dans les deux cas sur 4 ou elle ne l'est pas. */
						if(rayHit.collider.transform.position.z>_transform.position.z && !sensRotation)
						{
							sensRotation=true;
							_transform.rotation.eulerAngles = Vector3(0,0,0); // je reste droit
						}
						else if(rayHit.collider.transform.position.z<_transform.position.z && sensRotation)
						{
							sensRotation=false;
							_transform.rotation.eulerAngles = Vector3(0,180,0); // je reste droit
						}
						var spetreBoutDeux : GameObject = GameObject.Find("spetreBout");
					    Network.Instantiate(coupGlace,spetreBoutDeux.transform.position,spetreBoutDeux.transform.rotation,0);// on instancie le pouvoir magique
					    var glaceAttackInstanceDeux  : GameObject = Network.Instantiate(glaceAttack,spetreBoutDeux.transform.position,spetreBoutDeux.transform.rotation,0);// on instancie l'attaque de glace
						glaceAttackInstanceDeux.transform.LookAt(rayHit.collider.transform); // on oriente la glace vers l'eau
					}
				}
			}
		}
	}

	/* fonction éxécutée lors ce que la fille se téléporte sur la scène */
	function teleportation()
	{
		var Debut                 : GameObject; // particules du début
		var fin                   : GameObject; // particules de fin
		var positionTeleportation : Vector3;    // la position d'arrivée
		move=false;// on ne peut plus se déplacer
		Debut   = Network.Instantiate(teleportationParticle,Vector3(0,_transform.position.y+0.4,_transform.position.z),_transform.rotation,0); // on fait apparaitre le système.
		var rayHit : RaycastHit; //l'objet touché par le rayon
		var rayMouse = GameObject.Find("cameraFairy").GetComponent(Camera).ScreenPointToRay(Input.mousePosition); // le rayon est lancé de la caméra à la position de la souris
		if(Physics.Raycast(rayMouse,rayHit)) // si le rayon touche le viseur
		{
			positionTeleportation = rayHit.point; // on retient la position du clic de la souris dans la variable
		}
		yield WaitForSeconds(0.5);// on attend
		/* la fille se téléporte en z et y mais reste à zero pour sa position en x*/
		_transform.position.z=positionTeleportation.z;
		_transform.position.y=positionTeleportation.y;
		_transform.position.x=0;
		fin = Network.Instantiate(teleportationParticle,Vector3(0,_transform.position.y+0.4,_transform.position.z),_transform.rotation,0); // on fait apparaitre le système.
		move=true;// on  peut de nouveau se déplacer
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}