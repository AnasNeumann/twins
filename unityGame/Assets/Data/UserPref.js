#pragma strict

/* La classe d'enregistrement local des préférences de l'utilisateur */
class UserPref
{
//_____________________________________________________________________________________________________________________________________________
// LES PREFERENCES CONCERNANT LE NOM DE L'UTILISATEUR
//_____________________________________________________________________________________________________________________________________________

	/* function qui retourne le dernier nom d'utlisateur utilisé */
	static function getUser()
	{
		return PlayerPrefs.GetString("user");
	}
	
	/* fonction qui modifie le dernier utilisateur utilisé */
	static function setUser(user : String)
	{
		PlayerPrefs.SetString("user",user);
	}
	
//_____________________________________________________________________________________________________________________________________________
// LES PREFERENCES CONCERNANT LE MEILLEURS SCORES ENREGISTRES EN LOCAL
//_____________________________________________________________________________________________________________________________________________
	
	
	/* fonction qui retourne le meilleur score enregistré en local */
	static function getBestScore()
	{
		return PlayerPrefs.GetInt("score");
	}
	
	/* fonction qui modifie le méilleur score avec en amont un vérification */
	static function setBestScore(score : int)
	{
		if(score<getBestScore() && score>0) // si et seulement si le nouveau score et mieux que l'ancien meilleur score
		{
			PlayerPrefs.SetInt("score",score);
		}
		else if (getBestScore()==0)
		{
			PlayerPrefs.SetInt("score",5940); // si on n'a jamais fait de score notre score devient 99:00
		}
	}

//_____________________________________________________________________________________________________________________________________________
// LES PREFERENCES CONCERNANT LE CHOIX DU PERSONNAGE AVEC LEQUEL ON JOUE (SOEUR_FARY/FRERE_WARRIOR)
//_____________________________________________________________________________________________________________________________________________
	
	/* fonction qui retourne le dernier choix de personnage fait sur cette machine */
	public static function getChoixTwins()
	{
		return PlayerPrefs.GetString("ChoixTwins");
	} 		
	
	/* fonction qui modifie le choix du personnage frere/soeur */
	public static function setChoixTwins(ChoixTwins : String)
	{
		PlayerPrefs.SetString("ChoixTwins",ChoixTwins);
	}
//_____________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________
}