using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Servicios.api.Libreria.Core.Entities;
using Servicios.api.Libreria.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servicios.api.Libreria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibreriaServicioController : ControllerBase
    {
        private readonly IAutorRepository _autorRepository;

        private readonly IMongoRepository<AutorEntity> _autorGenericoRepository;

        private readonly IMongoRepository<EmpleadoEntity> _empleadoGenericoRepository;



        //Inyeccion de dependencias en los Controller
        public LibreriaServicioController(IAutorRepository autorRepository, IMongoRepository<AutorEntity> autorGenericoRepository , IMongoRepository<EmpleadoEntity> empleadoGenericoRepository) //Constructor
        {

            _autorRepository = autorRepository;  //Inyeccion

            _autorGenericoRepository = autorGenericoRepository;
            _empleadoGenericoRepository = empleadoGenericoRepository;

        }



        //Metodo para poder consultar los autores
        [HttpGet ("autores")]
        public async Task<ActionResult<IEnumerable<Autor>>> GetAutores()
        {
            var autores = await _autorRepository.GetAutores();
            return Ok(autores);
        }

     
        [HttpGet("autorGenerico")]
        public async Task<ActionResult<IEnumerable<AutorEntity>>> GetAutorGenerico()
        {

            var autores = await _autorGenericoRepository.GetAll();

            return Ok(autores);
        }


        [HttpGet("EmpleadoGenerico")]
        public async Task<ActionResult<IEnumerable<EmpleadoEntity>>> EmpleadoGenerico()
        {

            var empleados = await _empleadoGenericoRepository.GetAll();

            return Ok(empleados);  //Retornamos los elementos de la coleccion
        }



    }
}
