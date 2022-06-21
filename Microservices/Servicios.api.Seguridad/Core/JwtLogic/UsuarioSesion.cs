using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
namespace Servicios.api.Seguridad.Core.JwtLogic
{
    public class UsuarioSesion : IUsuarioSesion
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UsuarioSesion(IHttpContextAccessor httpContextAccessor)
        {   
            _httpContextAccessor = httpContextAccessor;

        }
        public string GetUsuarioSesion()
        {
            var userName="";        
            try
            {
                 userName = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == "username")?.Value;
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

            }


            return userName;



        }
    }
}

