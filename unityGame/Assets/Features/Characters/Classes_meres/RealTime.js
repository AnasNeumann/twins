/* la classe qui calcul , enregistre et renvoi l'affichage du temps écoulé en segonde depuis le début de la partie */
class RealTime extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________

	private var timeScore    : int        ; // le score d'un joueur
	private var constantTime : float      ; //le temps actuel
	private var minutesTime  : int        ; // le temps en minutes
	private var messageEcran : String     ; // l'affichage du temps 
	public  var guiTemps     : GameObject ; // le compteur textuel du temps depuis le début de la partie.

//_____________________________________________________________________________________________________________________________________________________________
// LES GETTERS ET LES SETTERS
//_____________________________________________________________________________________________________________________________________________________________
	
	/*fonction qui retourne le score des deux joueurs */
	public function getTimeScore() : int
	{
		return this.timeScore;
	}
	
	/* fonction qui modifie le score des deux joueurs */
	public function setTimeScore(newValue : int)
	{
		this.timeScore=newValue;
	}
	
	/* fonction qui retourne le temps depuis le début de la partie lancée par le serveur (en segondes ) */
	public function getConstantTime() : float
	{
		return this.constantTime;
	}
	
	/* fonction qui modifie le temps constant en segondes */
	public function setConstantTime(newValue : float)
	{
		this.constantTime=newValue;
	}

	/* fonction qui retourne le temps en minutes (sans les segondes) */
	public function getMinutesTime() : int
	{
		return this.minutesTime;
	}

	/* fonction qui modifie le temps en minutes */
	public function setMinutesTime(newValue : int)
	{
		this.minutesTime = newValue;
	}

	/* fonction qui retourne le message d'affichage du temps avec les minutes et segondes */
	public function getMessageEcran() : String
	{
		return this.messageEcran;
	}

	/* fonction qui modifie le message du score pour l'affichage à l'écran */
	public function setMessageEcran(newValue : String)
	{
		this.messageEcran = newValue;
	}

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES 
//______________________________________________________________________________________________________________________________________________________________

	/* fonction executé lors du calcul de la première frame */
	function Start()
	{
		initialisation(); //on met les valeurs à zero
		this.guiTemps = GameObject.Find("GUI_Text_Temps"); // on trouve le compteur.
	}

	/* fonction exécutée telle que Update à chaque Frame mais qui tient compte du décalage relatif entre le calcul de deux frame */
	function FixedUpdate()
	{
		calculScore(); // on calcul le temps
		AffichageModeMinutes(); // on calcul le temps en minutes.
		this.guiTemps.GetComponent(GUItemps).temps = getMessageEcran(); // on affiche le temps à l'écran
	}

//_______________________________________________________________________________________________________________________________________________________
// LES AUTRES FONCTIONS
//_______________________________________________________________________________________________________________________________________________________

	/* fonction qui met les valeurs à zero au début de la partie */
	public function initialisation()
	{
		setTimeScore(0);
		setMinutesTime(0);
		setConstantTime(0.0);
		setMessageEcran("");
	}

	/* fonction qui calcul le temps depuis le début de la partie en segonde */
	public function calculScore()
	{
		// On veut que le score soit égal au temps depuis le début du jeu mais en enlevant les millisegonde
		// On veut pour l'estétique un nombre entier et non pas un truc avec des virgules
		setConstantTime(Time.realtimeSinceStartup);
		if(getConstantTime()>=getTimeScore() + 1) //si une segonde est passée
		{
			setTimeScore(getTimeScore() + 1);
		}
	}

	/* fonction qui modifie l'affichage du temps en minutes */
	public function AffichageModeMinutes()
	{
		var compt :int = 0;
		for (var i : int = 1; i<=getTimeScore() ;i++ )
		{
			compt++;
			if(compt==60)
			{
				setMinutesTime(getMinutesTime()+1);
				compt=0;
			}
		}
		setMessageEcran(minutesTime+":"+compt);
		setMinutesTime(0);
	}
//_______________________________________________________________________________________________________________________________________________________
//_______________________________________________________________________________________________________________________________________________________			
}