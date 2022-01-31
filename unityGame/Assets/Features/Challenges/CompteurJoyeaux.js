/* la classe qui controle si une barrière de vigne doit s'ouvrir ou non */
class CompteurJoyeaux extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	public var ouvertureVigne  : int     ; // est-ce que la porte doit s'ouvrir ou non
	public var nbrJoyeaux     : int     ; // le nombre de joyeaux restant sur la scène
	public var nbrMax          : int     ; // le nombre de joyeaux maximal pour ouvrir la vigne
//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start ()
	{
		this.nbrJoyeaux = 328; // il y a, au début de la partie 334 joyeaux sur la scène.
		this.ouvertureVigne = 0 ; // on initialise la valeure de la fermeture
	}

	/* fonction calculée si notre objet touche un autre collider non trigger */
	function OnCollisionEnter(hit: Collision)
	{
		if(hit.gameObject.tag=="warrior" && nbrJoyeaux<=nbrMax) // si la collision est faite avec le garcon
		{
			if (GameObject.FindGameObjectWithTag("warrior").GetComponent(NetworkView).isMine == true) // si on n'est pas le garcon
			{
				/* on appel la RPC de changement de valeure de ouvertureJoyeaux */
				networkView.RPC("ouvertureVigneRPC", RPCMode.AllBuffered); // on ouvre la vigne
			}
		}
	}

//______________________________________________________________________________________________________________________________________________________________
//  FONCTIONS RPC
//______________________________________________________________________________________________________________________________________________________________

	/* fonction envoyée en réseau pour que la vigne descent sous le sol pour que l'on puisse passer */
	@RPC
	function ouvertureVigneRPC()
	{
		this.ouvertureVigne=1; // on envoi la valeure qui ouvre la vigne
	}
//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}