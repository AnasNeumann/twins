/* Cette classe controle la possibilité ou non de deplacer le personnage frere */
class WarriorInit extends MonoBehaviour 
{
	/* fonction éxécutée lors du calcul de la 1e frame */
	function Start()
	{
		if(networkView.isMine) // si le garcon est instanciée par moi sur le réseau
		{
			 GameObject.Find("cameraFairy").GetComponent(CameraFrere).enabled = true; // la caméra suis le frere
			 GameObject.Find("cameraFairy").GetComponent(CameraSoeur).enabled = false;  // la caméra ne suis pas la soeur
			 this.GetComponent(WarriorControl).enabled=true; // on peut controler le garcon
		}
		else // sinon
		{
			this.GetComponent(WarriorControl).enabled=false; // on ne peut pas controler le garcon
		}
	}
}