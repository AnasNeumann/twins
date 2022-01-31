/* la classe qui control la rotation de l'hélice sur la tête des plante qui volent */
class heliceControl extends MonoBehaviour
{
	public  var vie       : boolean   = true ; // est-ce que la plante est en vie ? si oui elle tourne, sinon non . 
	private var _tranform : Transform        ; // le transform de l'hélice. 
	
	function Start()
	{
		this._tranform = this.transform ; // on initialise la variable.
	}
	
	/* fonction éxécutée à chaque calcul d'une nouvelle frame avec régularisation des différence de temps entre chaque image */
	function FixedUpdate()
	{
		if(vie) // si la plante est en vie
		{
			move(); // les hélices tournent
		}
	}

	/* fonction de rotation continue de l'hélice */
	function move()
	{
		_tranform.Rotate(0,500*Time.deltaTime,0);// on tourne continuellement autours de l'axe Y
	}
}