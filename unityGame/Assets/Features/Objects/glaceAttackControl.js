/* la classe qui control les déplacement des boules de glace crées par  la fille */
class glaceAttackControl extends MonoBehaviour
{			
	
	private var _transform : Transform  ; // le composant transform de l'attaque de glace

	/* fonction calculée lors de la première frame */
	function Start ()
	{
		_transform = this.transform ; // pour l'optimisation 
	}
	
	/* fonction éxécutée au calcul de chaque frame avec régularisation des différences de temps entre chaque image */
	function FixedUpdate () 
	{
		_transform.Translate(0,0,2*Time.deltaTime,Space.Self); //on avance en continu
		_transform.position.x=0; // on freeze la position en x;
	}
		
}