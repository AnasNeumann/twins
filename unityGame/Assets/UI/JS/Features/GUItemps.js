#pragma strict

/* cette classe controle l'affichage du temps dans la fenetre de jeu */
class GUItemps extends MonoBehaviour
{
	public var temps : String ; // le temps écoulé depuis le début de la partie
	
	/* fonction éxécutée lors du calcul de la toute 1er frame */
	function Start()
	{
		this.temps = "0:0"; // on initialise le temps à zero
	}
	
	function Update()
	{
		this.GetComponent(GUIText).text = this.temps;
	}
}