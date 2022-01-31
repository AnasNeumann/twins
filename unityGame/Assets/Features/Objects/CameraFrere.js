#pragma strict

/* la classe qui permet à la caméra de suivre toujours le joueur frere sur la scène */
class CameraFrere extends MonoBehaviour
{
//______________________________________________________________________________________________________________________________________________________________
// VARIABLES DE CLASSES ET D'OBJETS
//______________________________________________________________________________________________________________________________________________________________
	
	private var target     : GameObject ; // le gameObject a suivre
	private var _transform : Transform  ; // le composant transform de la caméra  

//______________________________________________________________________________________________________________________________________________________________
// FONCTIONS DE BASE ET PREDEFINIES 
//______________________________________________________________________________________________________________________________________________________________

	/* fonction calculée lors de la première frame */
	function Start () 
	{
		_transform = this.transform ; // pour l'optimisation 
		target = GameObject.FindGameObjectWithTag("warrior");//on trouve l'objet
	}
	
	/* fonction exécutée à chaque calcul d'une nouvelle frame */
	function Update () 
	{
		_transform.position.z=target.transform.position.z;// le suivre dans le sens horizontal
		_transform.position.y=target.transform.position.y+2;// le suivre dans le sens vertical
	}

//______________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________
}