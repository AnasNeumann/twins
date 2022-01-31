/* la classe qui controle si le garcon est assez proche pour que le pont soit détruit */
class PontControl extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public var destruction : int     = 1 ; // est-ce que le pont doit se détruire ou pas

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lorsque l'on touche un autre collider */
	function OnTriggerEnter (hit: Collider)
	{
		if (hit.gameObject.tag=="warrior") // si la collision est faite avec le garcon et que l'on est le garcon
		{
			if (GameObject.FindGameObjectWithTag("warrior").GetComponent(NetworkView).isMine == true) // si on n'est pas le garcon
			{
				networkView.RPC("destructionPont", RPCMode.AllBuffered); // on envoi la RPC de destruction du pont
			}
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//  FONCTIONS RPC
//______________________________________________________________________________________________________________________________________________________________

	/* fonction envoyée en réseau lorsqu'on doit détruire le pont */
	@RPC
	function destructionPont()
	{
		this.destruction=0; // le pont est détruit
	}
			
//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}