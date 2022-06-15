using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Servicios.api.Seguridad.Core.Entities;

namespace Servicios.api.Seguridad.Core.JwtLogic
{
    public class JwtGenerator : IJwtGenerator
    {
        public string CreateToken(Usuario usuario)
        {
            var claims = new List<Claim>
            {
                new Claim ("username", usuario.UserName),
                new Claim ("nombre", usuario.Nombre),
                new Claim ("apellido", usuario.Apellido),

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("bkwPl}4F2N6L!OuJt&vo8Q)bl<|N_Z "));

            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);   //La clave asimetrica y el tipo de Encriptacion

            var tokenDescription = new SecurityTokenDescriptor
            {

                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(3),    //Tiempo de duracion del token
                SigningCredentials = credential
            };

            var tokenHandler = new JwtSecurityTokenHandler();

                var token = tokenHandler.CreateToken(tokenDescription);
            return tokenHandler.WriteToken(token);

         

        }
    }
}

