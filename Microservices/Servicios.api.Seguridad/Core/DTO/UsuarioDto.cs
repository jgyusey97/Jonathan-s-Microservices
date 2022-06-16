using System;
using System.Text.Json.Serialization;

namespace Servicios.api.Seguridad.Core.DTO
{

	//Objeto de transformacion de datos //Enviar la data que no quiero que sea publica //Tambien puede ser usada para unir campos
	public class UsuarioDto
	{
		public string Id { get; set; }

		[JsonPropertyName("apellido")]
		public string Apellido { get; set; }

		[JsonPropertyName("username")]

		public string Username { get; set; }

		[JsonPropertyName("email")]

		public string Email { get; set; }


		[JsonPropertyName("token")]

		public string Token { get; set; }


	}
}

