using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Servicios.api.Libreria.Core;
using Servicios.api.Libreria.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
namespace Servicios.api.Libreria.Repository
{
    public class MongoRepository<TDocument> : IMongoRepository<TDocument> where TDocument : IDocument
    {
        private readonly IMongoCollection<TDocument> _collection;

        public MongoRepository(IOptions<MongoSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var db = client.GetDatabase(options.Value.DataBase);

            _collection = db.GetCollection<TDocument>(GetCollectionName(typeof(TDocument)));
        }

        private protected string GetCollectionName(Type documentType)
        {
            return ((BsonCollectionAttribute)documentType.GetCustomAttributes(typeof(BsonCollectionAttribute), true).FirstOrDefault()).CollectionName;
        }



        //Me retorna la coleccion

        public async Task<IEnumerable<TDocument>> GetAll()
        {
            return await _collection.Find(p => true).ToListAsync();
        }


        //Metodo que devuelve el Objeto del documento a partir de un ID
        public async Task<TDocument> GetById(string Id)
        {
       

            var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, Id);  //Busqueda con el Id que envia el cliente

            return await _collection.Find(filter).SingleOrDefaultAsync();
        }

        //Insertar el documento
        public async Task InsertDocument(TDocument document)
        {

            await _collection.InsertOneAsync(document);

        }

        //Actualizar el documento

        public async Task UpdateDocument(TDocument document)
        {
            var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, document.Id);

            await _collection.FindOneAndReplaceAsync(filter, document); 
        }


        //Metodo para eliminar un documento
        public async Task DeleteById(string Id)
        {
            var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, Id);

            await _collection.DeleteOneAsync(filter);  //Eliminar el documento por el ID
        }




        //Metodo para realizar la paginacion de la lista que es cargada por los clientes
        public async Task<PaginationEntity<TDocument>> PaginationBy(Expression<Func<TDocument, bool>> filterExpression, PaginationEntity<TDocument> pagination)
        {



            var sort = Builders<TDocument>.Sort.Ascending(pagination.Sort);
            if (pagination.SortDirection == "desc") //Opcion para realizar el orden de la lista por descendente 
            {

                sort = Builders<TDocument>.Sort.Descending(pagination.Sort);

            }

            if (string.IsNullOrEmpty(pagination.Filter))
            {
                pagination.Data = await _collection.Find(p => true)
                                                             .Sort(sort)
                                                             .Skip((pagination.Page - 1) * pagination.PageSize)
                                                             .Limit(pagination.PageSize)
                                                             .ToListAsync();





            }
            else {

                pagination.Data = await _collection.Find(filterExpression)  //Utiliazamos la expresion para el filtro
                                                              .Sort(sort)
                                                              .Skip((pagination.Page - 1) * pagination.PageSize)
                                                              .Limit(pagination.PageSize)
                                                              .ToListAsync();



            }

            long totalDocuments = await _collection.CountDocumentsAsync(FilterDefinition<TDocument>.Empty); //.Empty retornara todos los registros de la base de datos
            var totalPages = Convert.ToInt32( Math.Ceiling( Convert.ToDecimal(totalDocuments / pagination.PageSize)));

            pagination.PagesQuantity = totalPages;

            return pagination;

        }
    }
}

