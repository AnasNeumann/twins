#pragma strict

/* cette classe contrôle que seule la fille peut déplacer le système de particule de déplacement du cube */
class MagieCubeinit extends MonoBehaviour 
{
	/* fonction éxécutée lors du calcul de la 1e frame */
	function Start()
	{
		if(networkView.isMine) // si la magie est instanciée par moi sur le réseau
		{
			this.gameObject.GetComponent(magieCubeControl).enabled=true; // je controle les déplacements de la magie.
		}
		else //sinon si elle est instanciée par l'autre joueur (donc je suis le frere et lui la soeur)
		{
			this.gameObject.GetComponent(magieCubeControl).enabled=false; // je ne controle pas les déplacements de la magie.
		}
	}
}