using Servicios.api.Libreria.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
namespace Servicios.api.Libreria.Repository
{

	//Cuando se 
	public interface IMongoRepository<TDocument> where TDocument : IDocument
	{
		
		Task<IEnumerable<TDocument>> GetAll();//Obtener todos los documentos de una coleccion
		Task<TDocument> GetById(string id); //Retornar un documento solo con el id

		Task InsertDocument(TDocument document);

		Task UpdateDocument(TDocument document);

		Task DeleteById(string Id);



		//Metodo para realizar la paginacion de los datos
		Task<PaginationEntity<TDocument>> PaginationBy(

			Expression <Func<TDocument, bool>> filterExpression,
			PaginationEntity <TDocument> pagination



		); 


	}





}

