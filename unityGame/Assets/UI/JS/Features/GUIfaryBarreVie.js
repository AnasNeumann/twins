/* la classe qui controle la texture que doit prendre la barre de vie de la fille ou du garcon en fonction de sa santé */
class GUIfaryBarreVie extends MonoBehaviour
{
	public var TextureArray : Texture2D[] = new Texture2D[11]; // les 11 niveau de vie de la fille/garcon en texture.
	public var nbrVie       : int                            ; // le nombre de vie de la fille/garcon. 
	
	/* fonction éxécutée lors du calcul de la toute première image */
	function Start()
	{
		/* on initialise les valeurs des variables */
		this.nbrVie   = 10; 
	}

	/* fonction éxécutée à chaque calcul d'une nouvelle frame avec régularisation des différence de temps entre chaque image */
	function Update()
	{
		if(nbrVie >=0)
		{
			this.guiTexture.texture = this.TextureArray[this.nbrVie] ; // on affiche la bonne valeur de la barre de vie.
		}
	}
}