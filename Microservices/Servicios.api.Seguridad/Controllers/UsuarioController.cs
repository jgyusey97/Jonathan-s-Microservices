using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Servicios.api.Seguridad.Core.Application;
using Servicios.api.Seguridad.Core.DTO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Servicios.api.Seguridad.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class UsuarioController : ControllerBase
    {


        private readonly IMediator _mediator;  //Es necesario Inyectar MediaTR para comunicarse con la capa de la aplicacion

        public UsuarioController(IMediator mediator)
        {
            _mediator = mediator;


        }
        [HttpPost("registrar")]

        public async Task<ActionResult<UsuarioDto>> Registrar(Register.UsuarioRegisterCommand parametros)
        {


            return await _mediator.Send(parametros);


        }
      
    }
}

