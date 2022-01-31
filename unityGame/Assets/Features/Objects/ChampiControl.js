#pragma strict

/* la classe qui control que les champinion de sauty rebondissent lorsque le garcon saute dessus */
class ChampiControl extends MonoBehaviour
{
	public var target : GameObject ; // le champinion qui doit jouer l'animation quand le garcon saute
	
	/* fonction calculée si notre objet touche un autre collider non trigger */
	function OnCollisionEnter(hit: Collision)
	{
		if(hit.gameObject.tag=="warrior" && hit.transform.position.y>1) // si la collision est faite avec le garcon et qu'il est au dessus.
		{
			target.animation.CrossFade("Rebond");
		}
	}
}
