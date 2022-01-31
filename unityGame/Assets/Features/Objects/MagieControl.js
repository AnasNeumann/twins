#pragma strict
/* la classe qui va permettre de déplacer le pouvoir magique d'instanciation de la fille */
class MagieControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	private var rayHit    : RaycastHit; // l'objet touché par le rayon
	public  var cube      : GameObject; // le cube à instantier
	private var testCube  : int;        // le nombre de changement de direction
	private var positionZ : int;        // la position courante en z.
	private var positionY : int;        // la position courante en y.
	private var _transform : Transform  ; // le composant transform de la magie
	private var cameraObject: Camera          ; // la camera 
//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES 
//______________________________________________________________________________________________________________________________________________________________
			
	/* fonction éxécutée lors du calcul de la première image */
	function Start()
	{
		testCube = 0; //on ne peut donc pas instantier de cube
		creation();   //on test la création d'un cube avec la souris
		positionZ = this.transform.position.z;
		positionY = this.transform.position.y;
		_transform = this.transform ; // pour l'optimisation 
		cameraObject     = GameObject.Find("cameraFairy").GetComponent(Camera); // pour l'optimisation
	}
	
	/* fonction éxécutée à chaque calcul d'une nouvelle image  */
	function Update () 
	{
		_transform.position.x=0; //on, freeze la position en x;
		var rayMouse = cameraObject.ScreenPointToRay(Input.mousePosition); // le rayon est lancé de la caméra à la position de la souris
		if(Physics.Raycast(rayMouse,rayHit) && rayHit.collider.name=="viseur") // si le rayon touche le viseur
		{
			_transform.position.z = rayHit.point.z;
			_transform.position.y = rayHit.point.y;
		}
		if (Input.GetMouseButtonUp(0)) // si on appui avec la souris sur le cube
		{
			if (testCube>=4)
			{
				Network.Instantiate(cube,_transform.position,_transform.rotation,0); // on instancie le pouvoir magique
			}
			networkView.RPC("dieRPC", RPCMode.AllBuffered); // on appel la RPC de suppréssion du NetworkView et donc on libere le NetworkViewID.
		}
	}
	
	@RPC
	function dieRPC()
	{
		Network.RemoveRPCs(this.networkView.viewID);  // on supprime les appel sur cette identifiant
		this.GetComponent(NetworkView).enabled=false; // on supprime le networkView de la magie (chacun la voie sans synchronisation)
		Destroy(this.gameObject);                     // on supprime la magie séparément chez chaque joueur.
	}
	
	/* la fonction de test de création d'un cube */
	function creation()
	{
		yield WaitForSeconds(0.3);
		if (_transform.position.z>=positionZ+0.3) // si on a bougé vers la Droite
		{
			testCube++;
			positionZ=_transform.position.z;
			yield WaitForSeconds(0.3);
			if(_transform.position.y>=positionY+0.3) // si on a bougé Droite_Haut
			{
				testCube++;
				positionY = _transform.position.y; 
				yield WaitForSeconds(0.3);
				if (_transform.position.z<=positionZ-0.3) //  si on a bougé Droite_Haut_Gauche 
				{
					testCube++;
					positionZ=_transform.position.z; 
					yield WaitForSeconds(0.3);
					if (_transform.position.y<=positionY-0.3) // si on a bougé Droite_Haut_Gauche_Bas :: On a fait un cube complet !
					{
						testCube++;
					}
				}
			}
			else if (_transform.position.y<=positionY-0.3) // si on a bougé Droit_Bas
			{
				testCube++;
				positionY=_transform.position.y; 
				yield WaitForSeconds(0.3);
				if (_transform.position.z<=positionZ-0.3) //  si on a bougé Droite_Bas_Gauche 
				{
					testCube++;
					positionZ=_transform.position.z; 
					yield WaitForSeconds(0.3);
					if (_transform.position.y>=positionY+0.3) // si on a bougé Droite_Bas_Gauche_Haut :: On a fait un cube complet !
					{
						testCube++;
					}
				}
			}
		}
		else if (_transform.position.z<=positionZ-0.3) // si on a bougé vers la Gauche
		{
			testCube++;
			positionZ=_transform.position.z;
			yield WaitForSeconds(0.3);
			if(_transform.position.y>=positionY+0.3) // si on a bougé Gauche_Haut
			{
				testCube++;
				positionY=_transform.position.y; 
				yield WaitForSeconds(0.3);
				if (_transform.position.z>=positionZ+0.3) //  si on a bougé Gauche_Haut_Droite 
				{
					testCube++;
					positionZ=_transform.position.z; 
					yield WaitForSeconds(0.3);
					if (_transform.position.y<=positionY-0.3) // si on a bougé Gauche_Haut_Droite_Bas :: On a fait un cube complet !
					{
						testCube++;
					}
				}
			}
			else if (_transform.position.y<=positionY-0.3) // si on a bougé Gauche_Bas
			{
				testCube++;
				positionY=_transform.position.y; 
				yield WaitForSeconds(0.3);
				if (_transform.position.z>=positionZ+0.3) //  si on a bougé Gauche_Bas_Droit
				{
					testCube++;
					positionZ=_transform.position.z; 
					yield WaitForSeconds(0.3);
					if (_transform.position.y>=positionY+0.3) // si on a bougé Gauche_Bas_Droit_Haut :: On a fait un cube complet !
					{
						testCube++;
					}
				}
			}
		}
		
		
	}
}

