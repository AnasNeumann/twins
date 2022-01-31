<?php
Class EntityScore
{
	/* Les variables d'instace */
	public $idScore;  // la cl� primaire
	public $idPartie; // une cl� �trang�re vers une partie
	public $idUser;   // une cl� �trang�re vers un joueur
	public $score;

	/* Le constructeur de la classe */
	public function __construct($idScore,$idPartie,$idUser,$score)
	{
		$this->idScore  = $idScore;
		$this->idPartie = $idPartie;
		$this->idUser   = $idUser;
		$this->score    = $score; // on a cr�e un score fait par un joueur dans une partie 
	}
}
//�crit par ANAS NEUMANN et ACHREF BOUHADIDA
//the Twins par Prod'IT Studio
?>