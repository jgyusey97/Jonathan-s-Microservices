using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Servicios.api.Libreria.Core.Entities
{

	[BsonCollection("Empleado")] //Nombre de la coleccion en la base de datos
	public class EmpleadoEntity : Document  //Toda clase debe de ser heredada desde Document
	{

		[BsonElement("nombre")]

		public string Nombre { get; set; }  //Nombre del empleado

		public EmpleadoEntity()
		{
			
		}
	}
}

