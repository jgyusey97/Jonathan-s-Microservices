using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Servicios.api.Libreria.Core;
using Servicios.api.Libreria.Core.Entities;
namespace Servicios.api.Libreria.Repository
{
    public class MongoRepository<TDocument> : IMongoRepository<TDocument> where TDocument : IDocument
    {
        private readonly IMongoCollection<TDocument> _collection;

        public MongoRepository(IOptions<MongoSettings> options )
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var db = client.GetDatabase(options.Value.DataBase);
            _collection = db.GetCollection<TDocument>(GetCollectionName(typeof (TDocument)));   //Nombre de la conexion en string
         
        }

        //Metodo que me va a traer el nombre de la coleccion usando el document type
        private protected string GetCollectionName(Type documentype)
        {
            return ((BsonCollectionAttribute)documentype.GetCustomAttributes(typeof(BsonCollectionAttribute), true).FirstOrDefault()).CollectionName;

        }


        //Me retorna la coleccion

        public   async Task<IEnumerable<TDocument>> GetAll()
        {
            return await _collection.Find(p => true).ToListAsync();
        }
    }
}

