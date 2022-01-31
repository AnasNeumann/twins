/* classe placée sur les caméra pour changer les images du curseur du jeu */
class CursorControl extends MonoBehaviour
{
	public var  curseurTexture : Texture2D; // la texture a mettre sur le curseur
	
	/* fonction éxécutée lors du calcul de la toute première frame */
	function Start () 
	{
		Cursor.SetCursor(curseurTexture, Vector2.zero, CursorMode.Auto);
	}

}