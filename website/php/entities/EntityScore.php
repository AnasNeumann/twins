<?php
Class EntityScore
{
	/* Les variables d'instace */
	public $idScore;  // la clé primaire
	public $idPartie; // une clé étrangère vers une partie
	public $idUser;   // une clé étrangère vers un joueur
	public $score;

	/* Le constructeur de la classe */
	public function __construct($idScore,$idPartie,$idUser,$score)
	{
		$this->idScore  = $idScore;
		$this->idPartie = $idPartie;
		$this->idUser   = $idUser;
		$this->score    = $score; // on a crée un score fait par un joueur dans une partie 
	}
}
//écrit par ANAS NEUMANN et ACHREF BOUHADIDA
//the Twins par Prod'IT Studio
?>