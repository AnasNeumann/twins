/* la classe qui controle les mouvements aléatoires des papillons sur la scène */
class PapillonControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public  var animationToPlay : String    ; // le nom de l'animation de battement d'aile que le papillon joue en boucle.
	public  var positionZmin    : float     ; // la position à gauche  que le papillon ne doit pas dépasser.
	public  var positionZmax    : float     ; // la position à droite  que le papillon ne doit pas dépasser.
	public  var positionYmin    : float     ; // la position en bas    que le papillon ne doit pas dépasser.
	public  var positionYmax    : float     ; // la position en haut   que le papillon ne doit pas dépasser.
	public  var positionXmin    : float     ; // la position derriere  que le papillon ne doit pas dépasser.
	public  var positionXmax    : float     ; // la position devant    que le papillon ne doit pas dépasser.
	private var deplacementX    : float     ; // la nouvelle direction dans l'axe x
	private var deplacementY    : float     ; // la nouvelle direction dans l'axe y
	private var deplacementZ    : float     ; // la nouvelle direction dans l'axe z
	private var timeToChange    : float     ; // le temps écoulé depuis le dernier changement de direction.
	private var _transform     : Transform ; // le transform d'un papillon. 
  
//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lors du calcul de la toute premiere image */
	function Start()
	{
		_transform  = this.transform ; // on initialise la variable transform. 
		/* on initialise les valeurs de départ */
		timeToChange=0;
		deplacementX=Random.Range(-1,1);  
		deplacementY=Random.Range(-1,1);
		deplacementZ=Random.Range(-1,1);
	}

	/* fonction éxécutée à chaque calcul d'une nouvelle frame avec régularisation des différence de temps entre chaque image */
	function FixedUpdate()
	{
		this.animation.Play(animationToPlay); // on joue l'animation en boucle
		controlPosition();                         // on appel la fonction de control de déplacement
		_transform .Translate(deplacementX*Time.deltaTime*0.5,deplacementY*Time.deltaTime*0.5,deplacementZ*Time.deltaTime*0.5); // le papillon vole
	}

//______________________________________________________________________________________________________________________________________________________________
// AUTRES FONCTIONS
//______________________________________________________________________________________________________________________________________________________________

	/* fonction qui controle les déplacement du papillon */
	function controlPosition()
	{
		if ( timeToChange >=1) // si le temps est passé et qu'on doit changer de direction 
		{
			timeToChange = 0; // on réinitialise le temps 
			
			/* control de la position en x */
			if (_transform.position.x>=this.positionXmax) // si on a dépacer sa position max en x
			{
				deplacementX = -1;
			}
			else if (_transform.position.x<=this.positionXmin) // si on a dépacer sa position min en x
			{
				deplacementX = 1;
			}
			else
			{
				deplacementX = Random.Range(-1.0,1.0);
			}
			
			/* control de la position en y */
			if (_transform .position.y>=this.positionYmax) // si on a dépacer sa position max en y
			{
				deplacementY = -1;
			}
			else if (_transform .position.y<=this.positionYmin) // si on a dépacer sa position min en y
			{
				deplacementY = 1;
			}
			else
			{
				deplacementY =  Random.Range(-1.0,1.0);
			}
			
			/* contol de la position en z */
			if (_transform .position.z>=this.positionZmax) // si on a dépacer sa position max en Z
			{
				deplacementZ = -1;
			}
			else if (_transform .position.z<=this.positionZmin) // si on a dépacer sa position min en z
			{
				deplacementZ = 1;
			}
			else
			{
				deplacementZ = Random.Range(-1.0,1.0);
			}
		}
		else //sinon (si se n'est pas encore le moment de changer de direction )
		{
			timeToChange+=Time.deltaTime; // on incrémente le temps.
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}