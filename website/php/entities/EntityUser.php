<?php
Class EntityUser
{
	/* Variables d'objets */
	public $id; // la clé primaire
	public $pseudo;
	public $password;

	/* Constructeur de la classe */
	public function __construct($id,$pseudo,$password)
	{
		$this->id=$id;
		$this->pseudo=$pseudo;
		$this->password=$password; // on a crée un nouvel utilisateur
	}
}
//écrit par ANAS NEUMANN et ACHREF BOUHADIDA
//the Twins par Prod'IT Studio
?>