using System;
using System.Collections.Generic;

namespace Servicios.api.Libreria.Core.Entities
{
 
     
	//Esta clase es la encargada para la paginacion de los datos de la pagina web

	//Para paginar los objetos de la coleccion que el cliente recibe los parametros para poder realizar la parametrizacion de los datos 
	
	public class PaginationEntity<TDocument>
	{
		public int PageSize { get; set; }

		public int Page { get; set; }

		public string Sort { get; set; }

		public string SortDirection { get; set; }

		public string Filter { get; set; }

		public int PagesQuantity { get; set; }

		public IEnumerable<TDocument> Data { get; set; }  //Cualquier coleccion de la base de datos de MongoDB

	}
}

