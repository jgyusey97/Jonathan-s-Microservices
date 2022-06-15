using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Servicios.api.Seguridad.Core.Entities;

namespace Servicios.api.Seguridad.Core.Persistence
{
	public class SeguridadData
	{
		public static async Task InsertarUsuario(SeguridadContexto context, UserManager<Usuario> usuarioManager)
        {

			if (!usuarioManager.Users.Any()) //Any es un metodo de linq para validar si existe un registro de la tabla
            {
                var usario = new Usuario
                {
                    Nombre = "Jonathan",    
                    Apellido = "Guzman",
                    Direccion = "Coop.Esmeraldas Chiquita Mz C15- SL 43",
                    UserName = "jguzman",
                    Email ="jonathan.guzman.veliz@gmail.com"
                     

                };

                await usuarioManager.CreateAsync(usario, "Password123&");
            }





        }
	}
}

