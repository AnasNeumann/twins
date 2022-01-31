/* la classe qui affiche le meilleurs score local sur la page du menu principal */
class AffichageMeilleurScore extends MonoBehaviour 
{

	/* fonction  qui transforme le score au format M:S */
	function transformFormat() : String
	{
		var score       : int    = UserPref.getBestScore(); // le score enregisté dans les Player Prefs
		var message     : String = ""                     ; // l'affichage final
		var compt       : int    = 0                      ; // les segondes 
		var minutesTime : int                             ; // le temps en minutes 
		for (var i : int = 1; i<=score ;i++ )
		{
			compt++;
			if(compt==60)
			{
				minutesTime++;
				compt=0;
			}
		}
		message = minutesTime+":"+compt;
		return message ; 
	}
	
	/* fonction executée lors du calcul de la toute 1e image donc juste après Awake */
	function Start () 
	{
		if (UserPref.getBestScore()>=5940) // si on n'a jamais jouer.
		{
			this.guiText.text = "Aucun score"; // Pas d'affichage d'un score
		}
		else
		{
			this.guiText.text = "Meilleur Score "+transformFormat(); // le GUi affiche le meilleurs score.
		}
	}
}