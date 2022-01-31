<?php
//on a besoin des define pour la connexion et de la classe des users
require_once ('Connexion.php');
require_once ('EntityUser.php');
require_once ('EntityPartie.php');
require_once ('EntityScore.php');
//on cr�er une classe qui contient des fonctions de s�curit�.
Class Protection
{
	/*
		on cr�er la fonction qui permet de proteger la base de donn�e.
		contre les injections sql et javasScript
	*/
	
	public static function protect($arg)
	{
		$conn = mysqli_connect(SERVER, USER, PASSWORD, DB_NAME);
		$return=mysqli_real_escape_string($conn, strip_tags($arg));
		mysqli_close($conn);
		return $return;
	}
	
	/*
		Une fonction qui utilise L'algorythme de Jules C�sar pour crypter les password des utilisateurs
		avec une cl� de 4;
		Cette methode inverse aussi les numeros 
	*/
	public static function encrypte($document)
	{
		/* La liste des substitutions par d�calage de jules c�sar (lettres minuscules)  */
		$juleCesar   = array("a"=>"e","b"=>"f","c"=>"g","d"=>"h","e"=>"i","f"=>"j","g"=>"k","h"=>"l","i"=>"m","j"=>"n","k"=>"o","l"=>"p","m"=>"q","n"=>"r","o"=>"s","p"=>"t","q"=>"u","r"=>"v","s"=>"w","t"=>"x","u"=>"y","v"=>"z","w"=>"a","x"=>"b","y"=>"c","z"=>"d");
		$cryptograme = strtr($document,$juleCesar); //la chaine apr�s Jules C�sar.
		
		/* La liste des substitutions par d�calage de jules c�sar (lettres majuscules)  */
		$juleCesarMaj   = array("A"=>"E","B"=>"F","C"=>"G","D"=>"H","E"=>"I","F"=>"J","G"=>"K","H"=>"L","I"=>"M","J"=>"N","K"=>"O","L"=>"P","M"=>"Q","N"=>"R","O"=>"S","P"=>"T","Q"=>"U","R"=>"V","S"=>"W","T"=>"X","U"=>"Y","V"=>"Z","W"=>"A","X"=>"B","Y"=>"C","Z"=>"D");
		$cryptograme    = strtr($cryptograme,$juleCesarMaj); //la chaine apr�s Jules C�sar sur les majuscules.
		
		/* La liste des inversions des chiffre avec substitutions */
		$inversion   = array ("1"=>"0","2"=>"9","3"=>"8","4"=>"7","5"=>"6","6"=>"5","7"=>"4","8"=>"3","9"=>"2","0"=>"1"); 
		$cryptograme = strtr($cryptograme,$inversion); //la chaine apr�s l'inversion des chiffres.
		
		//on laisse les caract�res sp�ciaux intacts.
		return $cryptograme;
	}
}
//�crit par ANAS NEUMANN et ACHREF BOUHADIDA
//the Twins par Prod'IT Studio
?>