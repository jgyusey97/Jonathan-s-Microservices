using Servicios.api.Libreria.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servicios.api.Libreria.Repository
{

    //Necesita consumir una instancia de la clase de MongoDB context , se debe de realizar una inyeccion de dependencias
    public interface IAutorRepository
    {
         Task<IEnumerable<Autor>> GetAutores();

    }
}
