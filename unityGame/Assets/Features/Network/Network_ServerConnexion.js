/* La classe JavaScript qui permet la mise en multijoueur via création d'un serveur */
class Network_ServerConnexion extends MonoBehaviour
{
//_____________________________________________________________________________________________________________________________________________
// LES VARIABLES DE CLASSE ET D'OBJETS
//_____________________________________________________________________________________________________________________________________________

	/* variables privées */
	private var useNat      : boolean = false;
	private var listenPort  : int    = 25000;
	private var remoteIP    : String;
	private var levelToLoad : String = "Jeu"; 
	private var password    : String;

	/* variables publiques */
	public  var fary        : GameObject;
	public  var warrior     : GameObject;

//_____________________________________________________________________________________________________________________________________________
// LES GETTERS ET LES SETTERS
//_____________________________________________________________________________________________________________________________________________

	public function getUseNate() : boolean //renvoi si on utilise un NAT dans la connexion ou non
	{
		return this.useNat;
		/* 
			- Network Adresse Translation pour traduire les adresses 
			- On utilise un NAT quand on ne possede pas d'adresse ip public 
			- n'est pas utilisé avec IPv6 car il n'y a pas le problème de manque d'adresses
		*/
	}

	public function setUseNat (newValue : boolean) //modifie l'utilisation ou non du Nat
	{
		this.useNat = newValue; 
	}

	public function getListenPort() : int //renvoi le port utlisé pour crée le serveur
	{
		return this.listenPort;
	}

	public function setListenPort(newValue : int) //modifie la valeur du port de lecture
	{
		this.listenPort = newValue;
	}

	public function getLevelToLoad() : String //le niveau que l'on veut lancer
	{
		return this.levelToLoad;
	}

	public function setLevelToLoad(newValue : String) //changer le niveau à lancer
	{
		this.levelToLoad = newValue;
	}

	public function getremoteIP() :String //renvoi l'@dresse IP privée du serveur distant
	{
		return this.remoteIP;
	}

	public function setremoteIP(newValue : String) //modifier l'adresse ip du serveur distant
	{
		this.remoteIP = newValue;
	}

	public function getPassword() : String // renvoi le mot passe de la connexion entre le joueur frere et le joueur soeur
	{
		return this.password;
	}

	public function setPassword(newValue : String) //modifier la valeur du mot de passe pour la connexion entre les deux joueurs
	{
		this.password = newValue; 
	}

//_____________________________________________________________________________________________________________________________________________
// LES FONCTIONS NETWORK DE BASE
//_____________________________________________________________________________________________________________________________________________

	/* fonction calculée lors de l'appel du script donc tout au début même avant Start */
	function Awake()
	{
		DontDestroyOnLoad(this); // Ne pas détruire ce composant car il doit y avoir réseaux meme après avoir chargé un niveau
	}

	/* Fonction de base qui charge automatiquement lorsque la connexion n'a pas marchée */
	function OnFailedToConnect(error: NetworkConnectionError)
	{
  		Application.LoadLevel("MenuPrincipal"); //on revient au menu "Rejoindre"
	}
	function OnPlayerDisconnected(player: NetworkPlayer) // quand le joueur client se déconnecte
	{
		Network.RemoveRPCs(player);
		Network.DestroyPlayerObjects(player);
	}
	function OnDisconnectedFromServer(info : NetworkDisconnection) // si le serveur s'est éteind
	{
		Application.LoadLevel("MenuPrincipal"); //on revient au menu "Rejoindre"
	}

	/* Fonction calculée automatiquement lors du passage vers le niveau levelToload */
	function OnLevelWasLoaded()
	{
		for(var obj in FindObjectsOfType(GameObject))
		{
			// On informe tous les objets de type GameObject de l'établissement de la connexion avec la fonction OnNetworkLoadedLevel
			obj.SendMessage("OnNetworkLoadedLevel", SendMessageOptions.DontRequireReceiver);
		}

		/* lorsque le serveur a démarée la partie */
		if(Network.isServer)
		{
			if(UserPref.getChoixTwins()=="fary" && GameObject.FindGameObjectWithTag("fary")==null) // si il a choisi la soeur
			{
				var faryServer : GameObject = Network.Instantiate(fary,Vector3(0,1,2),Quaternion(0,0,0,0),0); //on instancie la soeur dans la partie
				faryServer.name = UserPref.getUser();//on renome l'objet avec le pseudo du joueur.
			}
			else if (UserPref.getChoixTwins()=="warrior"  && GameObject.FindGameObjectWithTag("warrior")==null) // si il a choisi le frere
			{
				var warriorServer : GameObject = Network.Instantiate(warrior,Vector3(0,1,2),Quaternion(0,0,0,0),0); //on instancie le frere dans la partie
				warriorServer.name = UserPref.getUser();// on renome l'objet avec le pseudo du joueur.
			}
		}
	}
	
	 function verificationPresence()
	 {
		/* lorsque le client a rejoint la partie */
		if (Network.isClient)
		{
			/* Variables locales pour les essais*/
			var essaiWarrior : boolean = false; // est-ce que le frere est déjà présent dans la partie ? 
			var essaiFary    : boolean = false; // est-ce que la soeur est déjà présente dans la partie ?


			/* étape de vérifications des objets présents*/
			if (GameObject.FindGameObjectWithTag("warrior")!=null) // si le frere est présent
			{
				essaiWarrior=true;
			}

			if (GameObject.FindGameObjectWithTag("fary")!=null) // si la soeur est présente
			{
				essaiFary=true;
			}
	
			/* étape d'instanciation */
			if(essaiFary==true && essaiWarrior==false) //si il n'y a que la soeur de présente
			{
				var warriorClient : GameObject = Network.Instantiate(warrior,Vector3(0,1,2),Quaternion(0,0,0,0),0); //on instancie le frere dans la partie
				warriorClient.name = UserPref.getUser();// on renome l'objet avec le pseudo du joueur.
			}
			else if (essaiFary==false && essaiWarrior==true) // si il n'y a que le frere
			{
				var faryClient : GameObject = Network.Instantiate(fary,Vector3(0,1,2),Quaternion(0,0,0,0),0); //on instancie la soeur dans la partie
				faryClient.name = UserPref.getUser();//on renome l'objet avec le pseudo du joueur.
			}
			else if (essaiFary==false && essaiWarrior==false) //sinon (soit les deux déjà soit aucun objet serveur)
			{
				QuitterNetwork();// on quitte la partie
			}
			else if (essaiFary==true && essaiWarrior==true) //sinon (soit les deux déjà soit aucun objet serveur)
			{
				QuitterNetwork();// on quitte la partie
			}
		}
	}

//_____________________________________________________________________________________________________________________________________________
// LES AUTRES FONCTIONS
//_____________________________________________________________________________________________________________________________________________

	/* Fonction de démarrage d'un serveur pour pouvoir jouer en multijoueur */
	public function StartServer()
	{
		Network.incomingPassword = getPassword(); //le mot de passe de la connexion
		Network.InitializeServer(1, getListenPort(),this.getUseNate()); //on ne veux que 2 joueur donc une seule connexion sur le port choisi.
		DemarageJeu(); //On appel la Couroutine qui change de niveau pour passer dans le jeu lui même
		for(var obj in FindObjectsOfType(GameObject))
		{ 	
			// On informe tous les objets de type GameObject de l'établissement de la connexion avec la fonction OnNetworkLoadedLevel
			obj.SendMessage("OnNetworkLoadedLevel", SendMessageOptions.DontRequireReceiver);
		}
	}

	/* La fonction de connexion d'un client a se serveur */
	public function RejoindreServeur()
	{
		Network.Connect(getremoteIP(),getListenPort(),getPassword()); // on se connecte au serveur.
		DemarageJeu(); //On appel la Couroutine qui change de niveau pour passer dans le jeu lui même
		yield WaitForSeconds (10); // on attend 
		verificationPresence(); // on instancie le joueur manquant.
	}

	/* La couroutine qui permet de changer de niveau */
	public function DemarageJeu()
	{
		Application.LoadLevel(this.getLevelToLoad()); //on passe au niveau suivant
	}

	/* Couroutine pour quitter la partie et revenir au menu principal */
	public function QuitterNetwork()
	{
		Network.Disconnect(200);
		/* 
			200 milisegondes pour prévenir l'autre joueur de la deconnexion 
			si on met zero, les autres n'aurons pas le temps n'etre enregistré comme déconnectés.
			il y aura donc erreur lors de la reconnexion
			(il y a reset des infos de connexion telle que password...)
		*/
		Application.LoadLevel("MenuPrincipal");
	}

//_____________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________
}