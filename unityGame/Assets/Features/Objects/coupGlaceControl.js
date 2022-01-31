#pragma strict

/* la classe qui controle le fait que le spriteSheet du pouvoir de glace doit suivre les mouvements du septre */
class coupGlaceControl extends MonoBehaviour
{
	private var _transform : Transform  ; // le composant transform de l'attaque de glace
	private var septre     : GameObject ; // le bout du septre de la fille
	
	/*fonction éxécutée lors du calcul de la toute première frame */
	function Start()
	{
		_transform = this.transform                ; // pour l'optimisation 
		septre     = GameObject.Find("spetreBout") ; // pour l'optimisation 
		Destroy(this.gameObject,1); // le SpriteSheet ne vivra qu'une seule segonde pour économiser de la mémoire.
	}
	
	/* fonction éxécutée au calcul de chaque frame avec régularisation des différences de temps entre chaque image */
	function FixedUpdate ()
	{
		_transform.position = septre.transform.position; // le spriteSheet suivra toute sa vie le bout de la baguette magique de la fille.
	}
}
