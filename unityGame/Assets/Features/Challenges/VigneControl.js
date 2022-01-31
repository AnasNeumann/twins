class VigneControl extends MonoBehaviour 
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public  var targetName : String      ;  // le nom du pont compteur de joyeaux pour cette vigne 
	public  var target     : GameObject  ;  // le compteur de joyeaux pour cette vigne 
	public  var dust       : GameObject  ;  // la poussière crée lorsque la plante 
	private var inLife     : boolean     ;  // est-ce que la plante est en vie ? 
	private var _transform : Transform  ; // le composant transform de la balancoire

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start () 
	{
		/* on  initialise les variables */
		inLife     = true;
		target     = GameObject.Find(targetName);
		this._transform = this.transform ; 
	}

	/* fonction éxécutée à chaque calcul d'une nouvelle frame */
	function Update () 
	{
		if (target.GetComponent(CompteurJoyeaux).ouvertureVigne==1) // si la vigne doit s'ouvrir et mourrir. 
		{
			Open(); // on ouvre la porte
		}
	}

//______________________________________________________________________________________________________________________________________________________________
// AUTRES FONCTIONS
//______________________________________________________________________________________________________________________________________________________________

	/* la fonction qui ouvre la vigne */
	function Open()
	{
		if (this.inLife) // si on n'a pas encore instantier la poussière 
		{
			//on  la crée
			var dustVigne : GameObject = Instantiate (dust,Vector3(_transform.position.x,_transform.position.y-1.5,_transform.position.z),Quaternion(0,0,0,0));
			Destroy (dustVigne,10) ; // on détruit la poussière lorsqu'elle est finie
			this.inLife = false    ; // la vigne est morte elle n'invoquera plus de poussière
		}
		_transform.rotation.eulerAngles.y+=100*Time.deltaTime;      // la vigne rotate sur l'axe y
		_transform.Translate(0,-0.5*Time.deltaTime,0,Space.World);  // la vigne déscent dans le sol
		yield WaitForSeconds(5);
		_transform.Find("VignePorte").GetComponent(BoxCollider).enabled=false; // il n'y a plus de box collider
		Destroy (this.gameObject,5); // on détruit la vigne
	}
//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}