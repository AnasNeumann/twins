#pragma strict

/* la classe qui control que le GUI "compteur de joyeaux" affiche le nombre de joyeaux récupéré par le garcon lors de la partie. */
class GUIcristaux extends MonoBehaviour 
{
	public var nbrCristaux : int ; // le nombre de joyeaux que le garcon à récupéré
	
	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start()
	{
		this.nbrCristaux = 0; // on initialise le nombre de cristaux que le garcon récupère.*
	}
	
	function Update()
	{
		this.GetComponent(GUIText).text = this.nbrCristaux.ToString() ; // on affiche le nombre de joyeaux récupéré dans le GUI texte.
	}
}