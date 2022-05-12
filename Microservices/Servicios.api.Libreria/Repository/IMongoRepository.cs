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
		
		Task<IEnumerable<TDocument>> GetAll();
	}





}

