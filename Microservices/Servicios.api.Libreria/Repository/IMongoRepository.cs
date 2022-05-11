using System;
using System.Linq;
using System.Collections.Generic;

using Servicios.api.Libreria.Core.Entities;
using System.Threading.Tasks;

namespace Servicios.api.Libreria.Repository
{

	//Cuando se 
	public interface IMongoRepository <TDocument> where TDocument : IDocument
	{
		public  Task<IEnumerable<TDocument>> GetAll();
	}





}

