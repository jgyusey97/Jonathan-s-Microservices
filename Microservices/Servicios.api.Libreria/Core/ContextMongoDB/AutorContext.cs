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
        private readonly IMongoDatabase _db;  //Esta variable representa la conexion de la base de datos

        //Creamos las interfaces


        //Inicializamos el Contexto del Autor
        public AutorContext(IOptions<MongoSettings> options)
        {
            
            //Se inicializa el acceso a la base de MongoDB
            var client = new MongoClient(options.Value.ConnectionString);
            _db = client.GetDatabase(options.Value.DataBase);  

        }


        //Metodo para retornar los datos de la coleccion de Autor
        public IMongoCollection<Autor> Autores => _db.GetCollection<Autor>("Autor");   
    }
}
