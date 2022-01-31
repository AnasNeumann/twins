/* la classe qui gère l'affichage du score et sa disparition en fin de partie  */
class gestionAffichageScore extends MonoBehaviour
{
	/* fonction éxécutée une fois que l'on a appuié sur le bouton avec le clic gauche de la souris */
	function OnMouseUp()
	{
		var finPartie = GameObject.Find("finPartie");
		if(gameObject.name=="bouton_soumettre")  // si on poste le score
		{
	 		Destroy(finPartie,1);  // on attend avant de détruire
		}
		else // sinon , si on ne fait que retourner au menu principal
		{
			Destroy(finPartie,1); // on quitte directement
		}
	}
}