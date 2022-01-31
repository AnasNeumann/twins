/* Cette classe controle la possibilité ou non de deplacer le personnage Soeur */
class FairyInit extends MonoBehaviour 
{
	/* fonction éxécutée lors du calcul de la 1e frame */
	function Start()
	{
		if(networkView.isMine) // si la fille est instanciée par moi sur le réseau
		{
			 GameObject.Find("cameraFairy").GetComponent(CameraFrere).enabled = false; // la caméra ne suis pas le frere
			 GameObject.Find("cameraFairy").GetComponent(CameraSoeur).enabled = true;  // la caméra suis la soeur
			 this.GetComponent(FairyControl).enabled=true; // on peut controler la fille
		}
		else // sinon
		{
			this.GetComponent(FairyControl).enabled=false; // on ne peut pas controler la fille
		}
	}
}