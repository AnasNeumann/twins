/* Cette classe controle que seul l'ordinateur du joueur Soeur calcul les agissement des plantes mobiles et les envois au joueur frere */
class PlanteMobileInit extends MonoBehaviour
{
	/* fonction éxécutée lors du calcul de la 1e frame */
	function Start()
	{
		if(networkView.isMine) // si la plante est instanciée par moi sur le réseau
		{
			this.gameObject.GetComponent(PlanteMobileControl).enabled=true; // je controle les déplacements de la plante.
		}
		else //sinon si elle est instanciée par l'autre joueur (donc je suis le frere et lui la soeur)
		{
			this.gameObject.GetComponent(PlanteMobileControl).enabled=false; // je ne controle pas les déplacements de la plante.
		}
	}
}