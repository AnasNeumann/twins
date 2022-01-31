#pragma strict

/* cette classe contrôle que seule la fille peut déplacer le systèmede particule de création du cube */
class MagieInit extends MonoBehaviour 
{
	/* fonction éxécutée lors du calcul de la 1e frame */
	function Start()
	{
		if(networkView.isMine) // si la magie est instanciée par moi sur le réseau
		{
			this.gameObject.GetComponent(MagieControl).enabled=true; // je controle les déplacements de la magie.
		}
		else //sinon si elle est instanciée par l'autre joueur (donc je suis le frere et lui la soeur)
		{
			this.gameObject.GetComponent(MagieControl).enabled=false; // je ne controle pas les déplacements de la magie.
		}
	}
}