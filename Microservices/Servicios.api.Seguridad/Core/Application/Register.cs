using System;
using MediatR;
using Servicios.api.Seguridad.Core.DTO;
using Servicios.api.Seguridad.Core.Entities;

namespace Servicios.api.Seguridad.Core.Application
{
	public class Register
	{
		public class UsuarioRegisterCommand: IRequest<UsuarioDto>
        {

			public string Nombre { get; set; }

			public string Apellido { get; set; }

			public string Username { get; set; }

			public string Email { get; set; }
			public string Password { get; set; }

        }


	}
}

