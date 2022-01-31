#pragma strict

/* la classe qui controle l'autodestruction après un certain temps */
class AutoDestuction extends MonoBehaviour 
{
	public var timeToLive : float; // le temps de vie d'un game object 
	
	/* fonction éxécutée à chaque calcul d'une nouvelle image */
	public function Update()
	{
		Destroy(this.gameObject,timeToLive); // l'objet attaché ne vivra que "timeToLive" segondes.
	}
}