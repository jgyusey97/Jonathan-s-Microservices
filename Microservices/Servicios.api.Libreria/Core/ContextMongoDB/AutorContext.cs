using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Servicios.api.Libreria.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servicios.api.Libreria.Core.ContextMongoDB
{
    public class AutorContext: IAutorContext
    {
        private readonly IMongoDatabase _db;

        //Creamos las interfaces

        public AutorContext(IOptions<MongoSettings> options)
        {

            //Se inicializa el acceso a la base de MongoDB
            var client = new MongoClient(options.Value.ConnectionString);
            _db = client.GetDatabase(options.Value.DataBase);  

        }
        public IMongoCollection<Autor> Autores => _db.GetCollection<Autor>("Autor");   
    }
}
