/* la classe qui controle l'ouverture des vignes qui sont de part et d'autre de la balancoire */
class VigneBalancoire extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public  var target     : GameObject ; // la balancoire que doit observer la vigne.
	private var inLife     : boolean    ; // est-ce que la plante est en vie ?
	public  var dust       : GameObject ; // la poussière crée lorsque la plante
	private var _transform : Transform  ; // le composant transform de la balancoire    

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start () 
	{
		_transform = this.transform ; // pour l'optimisation
		inLife = true; // la plante est toujours vivante au début.
	}
	
	/* fonction éxécutée à chaque calcul d'une nouvelle frame */
	function Update () 
	{
		if (this.target.GetComponent(BalancoireControl).openVigne == true) // si la vigne doit s'ouvrir
		{
			Open();  // on joue l'ouverture de la plante avec la fonction Open
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//  FONCTIONS RPC
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
		yield WaitForSeconds(8);
		_transform.Find("VignePorte").GetComponent(BoxCollider).enabled=false; // il n'y a plus de box collider
		Destroy (this.gameObject,2); // on détruit la vigne
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}