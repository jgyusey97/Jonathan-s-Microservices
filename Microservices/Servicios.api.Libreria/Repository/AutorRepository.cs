

using MongoDB.Driver;
using Servicios.api.Libreria.Core.ContextMongoDB;
using Servicios.api.Libreria.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servicios.api.Libreria.Repository
{
    public class AutorRepository : IAutorRepository
    {
        private readonly IAutorContext _autorContext;
        public AutorRepository(IAutorContext autorContext)
        {
            _autorContext = autorContext; 
            }

        //Metodo para poder obtener una lista de autores
        public async Task<IEnumerable<Autor>> GetAutores()
        {
            IEnumerable<Autor> resp = null;

            try
            {
                resp= await _autorContext.Autores.Find(p => true).ToListAsync();   //Retornamos la Lista de autores
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.ToString());
            }
            return resp;
         
        }
    }
}
