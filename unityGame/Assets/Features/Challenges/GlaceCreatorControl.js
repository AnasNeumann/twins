/* la classe qui controle les créateur de bloc de glace */
class GlaceCreatorControl extends MonoBehaviour
{
	public var creation  : boolean = true ; // est-ce que le createur peut instancié un bloque de glace ou non ?
	public  var blocGlace : GameObject     ; // le bloque qui doit apparaitre

	/* fonction éxécutée lorsque l'on touche un autre collider */
	function OnTriggerEnter (hit: Collider)
	{
		if (hit.gameObject.name=="glace_attack(Clone)") // si on se fait glacer
		{
			Destroy(hit.gameObject); // on détruit la boule de glace
			if (this.creation && GameObject.FindGameObjectWithTag("fary").networkView.isMine)
			{
				this.creation = false ;  // on ne peut plus créer
				var blockInstanciate  : GameObject = Network.Instantiate (blocGlace,Vector3(0,this.transform.position.y+0.3,this.transform.position.z),this.transform.rotation,0); // on crée le bloc de glace
				blockInstanciate.GetComponent(blockGlaceControl).targetApparition = this.gameObject ; // on est le créateur du bloc
			}
		}
	}

}