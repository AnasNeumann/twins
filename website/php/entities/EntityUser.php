<?php
Class EntityUser
{
	/* Variables d'objets */
	public $id; // la cl� primaire
	public $pseudo;
	public $password;

	/* Constructeur de la classe */
	public function __construct($id,$pseudo,$password)
	{
		$this->id=$id;
		$this->pseudo=$pseudo;
		$this->password=$password; // on a cr�e un nouvel utilisateur
	}
}
//�crit par ANAS NEUMANN et ACHREF BOUHADIDA
//the Twins par Prod'IT Studio
?>