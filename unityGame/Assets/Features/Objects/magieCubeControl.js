/* la classe qui control les déplacements de la magie présente quand on déplace un cube avec la fille */
class magieCubeControl extends MonoBehaviour
{
	private var rayHit    : RaycastHit; // l'objet touché par le rayon
		
	/* fonction éxécutée à chaque calcul d'une nouvelle image  */
	function Update () 
	{
		this.transform.position.x=0; //on, freeze la position en x;
		var rayMouse = GameObject.Find("cameraFairy").GetComponent(Camera).ScreenPointToRay(Input.mousePosition); // le rayon est lancé de la caméra à la position de la souris
		if(Physics.Raycast(rayMouse,rayHit) && rayHit.collider.name=="cube(Clone)") // si le rayon touche un cube
		{
			this.transform.position.z = rayHit.point.z;
			this.transform.position.y = rayHit.point.y;
		}
		if (Input.GetMouseButtonUp(0)) // si on appui avec la souris sur le cube
		{
			networkView.RPC("dieRPC", RPCMode.AllBuffered); // on appel la RPC de suppréssion du NetworkView et donc on libere le NetworkViewID.
		}
	}
	
	@RPC
	function dieRPC()
	{
		Network.RemoveRPCs(this.networkView.viewID);  // on supprime les appel sur cette identifiant
		this.GetComponent(NetworkView).enabled=false; // on supprime le networkView de la magie (chacun la voie sans synchronisation)
		Destroy(this.gameObject);                     // on supprime la magie séparément chez chaque joueur.
	}
}
