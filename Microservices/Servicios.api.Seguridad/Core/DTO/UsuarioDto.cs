using System;
using System.Text.Json.Serialization;

namespace Servicios.api.Seguridad.Core.Dto
{

	//Objeto de transformacion de datos //Enviar la data que no quiero que sea publica //Tambien puede ser usada para unir campos
	public class UsuarioDto
	{
		public string Id { get; set; }

		public string Apellido { get; set; }


		public string Username { get; set; }

	
		public string Email { get; set; }




		public string Nombre { get; set; }


		

		public string Token { get; set; }


	}
}

