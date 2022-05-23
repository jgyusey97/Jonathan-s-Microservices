using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Servicios.api.Libreria.Core.Entities;
using Servicios.api.Libreria.Repository;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Servicios.api.Libreria.Controllers
{

    [Route("api/[controller]")]
    [ApiController]   //Controlador para los metodos relacionados con los libros de la base de datos 
    public class LibroController : ControllerBase
    {
        private readonly IMongoRepository<LibroEntity> _libroRepository;


        public LibroController (IMongoRepository<LibroEntity> libroRepository)
        {

            _libroRepository = libroRepository;

        }
        [HttpPost]

        public async Task Post (LibroEntity libro)
        {
            await _libroRepository.InsertDocument(libro);
        }
        [HttpGet]

        public async Task <ActionResult<IEnumerable<LibroEntity>>> Get()
        {

            return Ok(await _libroRepository.GetAll());   //Retorna todos los documentos de la coleccion de libros 

        }

        //Paginacion en la coleccion de libros en MongoDB

        [HttpPost ("pagination")]
        public async Task<ActionResult<IEnumerable<LibroEntity>>> PostPagination(PaginationEntity<LibroEntity> pagination)
        {

            var resultados = await _libroRepository.PaginationByFilter(pagination);

            return Ok(resultados);

        }


        [HttpGet("{id}")]

        public async Task<ActionResult<IEnumerable<LibroEntity>>> GetById(string Id)
        {


            var libro = await _libroRepository.GetById(Id);


            return Ok(libro);
        }



    }
}

