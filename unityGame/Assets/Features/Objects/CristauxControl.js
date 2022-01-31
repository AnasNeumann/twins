/* la classe qui controle les cristaux rouge que le garcon doit récupérer. */
class CristauxControl extends MonoBehaviour
{
	public  var _transform  : Transform  ; // le composant transform des cristaux
	private var guiJoyeaux  : GameObject ; // le compteur textuel du nombre de joyeaux récupéré.

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES
//______________________________________________________________________________________________________________________________________________________________

	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start()
	{
		this.guiJoyeaux = GameObject.Find("GUI_Text_Joyeaux"); // on trouve le compteur.
		_transform = this.transform ; // pour l'optimisation
	}

 	/* fonction éxécutée lorsque l'on touche un autre collider */
	function OnTriggerEnter (hit: Collider)
	{
		if (hit.gameObject.tag=="warrior") // si le garcon rentre dans le cristal
		{
			if (hit.GetComponent(NetworkView).isMine == true) // si on n'est le garcon
			{
				GameObject.Find("bloc_vigne_1").GetComponent(CompteurJoyeaux).nbrJoyeaux--; // on décrémente d'un joyeaux.
				GameObject.Find("bloc_vigne_2").GetComponent(CompteurJoyeaux).nbrJoyeaux--; // on décrémente d'un joyeaux.
				networkView.RPC("recuperation", RPCMode.AllBuffered);
			}
		}
	}

	/* fonction éxécutée à chaque calcul d'une nouvelle frame */
	function Update () 
	{
		_transform.Rotate(0,0,200*Time.deltaTime,Space.Self); // le cristal tourne sur lui même.
	}

//______________________________________________________________________________________________________________________________________________________________
//  FONCTIONS RPC
//______________________________________________________________________________________________________________________________________________________________

	/* fonction de destruction du cristal */
	@RPC
	function recuperation()
	{
		this.guiJoyeaux.GetComponent(GUIcristaux).nbrCristaux ++ ; // on actualise le nombre de joyaux récupéré à l'écran
		this.transform.localScale+=Vector3(0.4,0.4,0.4); // le cristal grossi
		Network.RemoveRPCs(this.networkView.viewID);  // on supprime les appel sur cette identifiant
		this.GetComponent(NetworkView).enabled=false; // on supprime le networkView des cristaux (chacun la voie sans synchronisation)
		Destroy(this.gameObject,0.1); // il disparait
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}