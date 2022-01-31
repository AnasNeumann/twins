/* la classe qui control l'aparition de poussière quand le garcon marche sur le sol */
class DustControl extends MonoBehaviour
{
	public var dust : GameObject ; // le système de particule instancié par le garcon quand il marche.
	
	/* fonction éxécutée lorsque l'on touche un autre collider */
	function OnTriggerEnter (hit: Collider)
	{
		if(hit.gameObject.tag=="sol") // si la collision est faite avec le sol
		{
			var dustInstantiate : GameObject = Instantiate (dust,this.transform.position,this.transform.rotation); // on crée la poussière
			Destroy (dustInstantiate,1); // on détruit la poussière après une segonde (l'animation sera déjà finie elle ne dure que 0.2 segondes)	
		}
	}
}