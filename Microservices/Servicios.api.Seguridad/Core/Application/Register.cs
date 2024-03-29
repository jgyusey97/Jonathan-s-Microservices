﻿using System;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Servicios.api.Seguridad.Core.Dto;
using Servicios.api.Seguridad.Core.Entities;
using Servicios.api.Seguridad.Core.JwtLogic;
using Servicios.api.Seguridad.Core.Persistence;

namespace Servicios.api.Seguridad.Core.Application
{
    public class Register
	{
		public class UsuarioRegisterCommand: IRequest<UsuarioDto>  //Esta clase va ha recibir los parametros que solicite el usuario y cuando todo este bien , devolvera un usuario dto al cliente
        {

            [JsonPropertyName("nombre")]
			public string Nombre { get; set; }


            [JsonPropertyName("apellido")]
            public string Apellido { get; set; }

            [JsonPropertyName("userName")]

            public string Username { get; set; }

            [JsonPropertyName("email")]

            public string Email { get; set; }


            [JsonPropertyName("password")]


            public string Password { get; set; } 

        }

        //Esta clase va validar cada propiedad segun la regla que tengamos definida
        public class UsuarioRegisterValidation: AbstractValidator<UsuarioRegisterCommand>
        {

            public UsuarioRegisterValidation()
            {
                RuleFor(x => x.Nombre).NotEmpty();
                RuleFor(x => x.Apellido).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();




            }

        }
        public class UsuarioRegisterHandler : IRequestHandler<UsuarioRegisterCommand, UsuarioDto>
        {

            //CON ESTOS OBJETOS HAGO LA INSERCION A LA BASE DE DATOS Y TOKEN
            private readonly SeguridadContexto _context;


            private readonly UserManager<Usuario> _userManager;

            private readonly IMapper _mapper;

            private readonly IJwtGenerator _jwtGenerator;


            public UsuarioRegisterHandler(SeguridadContexto context, UserManager<Usuario> userManager, IMapper mapper, IJwtGenerator jwtGenerator)
            {
                _context = context;

                _userManager = userManager;

                _mapper = mapper;

                _jwtGenerator = jwtGenerator;
            }

            public async Task<UsuarioDto> Handle(UsuarioRegisterCommand request, CancellationToken cancellationToken)
            {
               var existe= await _context.Users.Where(x => x.Email == request.Email).AnyAsync();


                if (existe)
                {

                    throw new Exception("EL email del usuario ya existe en la base de datos");
                }


                existe = await _context.Users.Where(x => x.UserName == request.Username).AnyAsync();


                if (existe)
                {
                    throw new Exception("El username del usuario ya existe en la base de datos");


                }


                //Creamos un nuevo usuario en la base de datos


                var usuario = new Usuario  
                {
                    Nombre = request.Nombre,
                    Apellido = request.Apellido,
                    Email = request.Email,
                    UserName = request.Username,
                  
                   
                };

                var resultado = await _userManager.CreateAsync(usuario, request.Password);

                if (resultado.Succeeded)
                {


                  var usuarioDto=  _mapper.Map<Usuario, UsuarioDto>(usuario);  //Esto me devolvera un mapeo en una clase DTO en base a una clase base
                    usuarioDto.Token = _jwtGenerator.CreateToken(usuario);



                        return usuarioDto;

                }
                else
                {
                    throw new Exception("No se pudo registrar el usuario");
                }

                

            }
        }


    }
}

