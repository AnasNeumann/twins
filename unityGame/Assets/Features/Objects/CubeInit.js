/* cette classe contrôle que seule la fille peut déplacer le cube */
class CubeInit extends MonoBehaviour 
{
	/* fonction éxécutée lors du calcul de la 1e frame */
	function Start()
	{
		if(networkView.isMine) // si le cube est instanciée par moi sur le réseau
		{
			this.gameObject.GetComponent(BoxControl).enabled=true; // je controle les déplacements du cube.
		}
		else //sinon si il est instancié par l'autre joueur (donc je suis le frere et lui la soeur)
		{
			this.gameObject.GetComponent(BoxControl).enabled=false; // je ne controle pas les déplacements du cube.
		}
	}
}