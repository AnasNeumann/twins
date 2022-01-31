#pragma strict

/* cette classe est similaire à autoDestruction sauf qu'elle envoi la destruction à l'autre joueur */
class AutoDestructionOnLigne extends MonoBehaviour 
{
	public var timeToLive : float; // le temps de vie d'un game object 
	
	/* fonction éxécutée lors du calcul de la 1er image */
	public function Start()
	{
		networkView.RPC("dieRPC", RPCMode.AllBuffered);	// on  appel la RPC de destruction
	}
	@RPC
	function dieRPC()
	{
		Network.RemoveRPCs(this.networkView.viewID);  // on supprime les appel sur cette identifiant
		this.GetComponent(NetworkView).enabled=false; // on supprime le networkView de la magie (chacun la voie sans synchronisation)
		Destroy(this.gameObject,timeToLive);          // l'objet attaché ne vivra que "timeToLive" segondes.
	}
}