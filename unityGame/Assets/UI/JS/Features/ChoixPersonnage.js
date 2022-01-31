/* LA classe js qui sert a choisir le personage de jeu en l'enregistrant dans playerPrefs et déplace une spotLight pour le choix */
class ChoixPersonnage extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	/* les variables de classes et d'objet */
	public  var warrior   : GameObject ; //le frere
	public  var fary      : GameObject ; //la soeur 
	public  var connexion : GameObject ; //l'objet qui lance la connexion
	public  var lueur     : GameObject ; // la lueur qui suit l'objet séléctioné.  
	private var rayMouse  : Ray        ; //le rayon lancé par la souris
	private var rayHit    : RaycastHit ; //l'objet touché par le rayon
	public  var coupGlace : GameObject ; // l'effet du septre lorsque l'on clic sur la fille.

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES 
//______________________________________________________________________________________________________________________________________________________________

	/* fonction calculée lors de la première frame donc juste après Awake() */
	function Start()
	{
		UserPref.setChoixTwins("warrior");
	}
	
	/* fonction qui se calcul à chaque frame du jeu donc environ 24 fois par segonde au minimum */
	function Update ()
	{
		if (Input.GetMouseButtonDown(0)) // si on appui avec la souris
		{
			rayMouse = camera.ScreenPointToRay(Input.mousePosition); // le rayon est lancé de la caméra à la position de la souris
			if(Physics.Raycast(rayMouse,rayHit)) // si le rayon touche un objet
			{
				if(rayHit.transform.tag=="warrior") // si on a séléctioné le garcon
				{
					UserPref.setChoixTwins(rayHit.transform.tag); // on enregistre le nom du personnage choisi
					AttaqueWarrior(rayHit.transform.gameObject); // on joue l'animation
				}
				else if(rayHit.transform.tag=="fary")
				{
					UserPref.setChoixTwins(rayHit.transform.tag); // on enregistre le nom du personnage choisi
					AttaqueMage(rayHit.transform.gameObject); // on joue l'animation
				}
			}
		}
	}

//_____________________________________________________________________________________________________________________________________________
// LES AUTRES FONCTIONS
//_____________________________________________________________________________________________________________________________________________
	
	/* fonction qui joue l'animation d'attaque du garcon une seule fois */
	function AttaqueWarrior(target : GameObject)
	{
		target.GetComponent(Animator).SetFloat("action",1);
		lueur.transform.position.z = 4.65 ;  // la lueur se place derrière le garcon
		yield WaitForSeconds(0.6);
		target.GetComponent(Animator).SetFloat("action",0);
	}
	
	/* fonction qui joue l'animation d'attaque de la fille une seule fois */
	function AttaqueMage(target : GameObject)
	{
		target.GetComponent(Animator).SetFloat("action",1);
		lueur.transform.position.z = 5.84 ;  // la lueur se place derrière la fille
		yield WaitForSeconds(1);
		var spetreBout : GameObject = GameObject.Find("spetreBout");
		Instantiate(coupGlace,spetreBout.transform.position,spetreBout.transform.rotation);// on instancie le pouvoir magique
		yield WaitForSeconds(0.6);
		target.GetComponent(Animator).SetFloat("action",0);
	}

//_____________________________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________________________
}