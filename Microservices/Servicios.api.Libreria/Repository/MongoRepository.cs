using System;
using System.Linq;
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
            return ((BsonCollectionAtribute)documentype.GetCustomAttributes(typeof(BsonCollectionAtribute), true).FirstOrDefault()).CollectionName;

        }

        public IQueryable<TDocument> GetAll()
        {
            return _collection.AsQueryable();
        }
    }
}

