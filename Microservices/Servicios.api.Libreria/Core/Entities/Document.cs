using System;
using MongoDB.Bson;

namespace Servicios.api.Libreria.Core.Entities
{
	public class Document: IDocument
	{

		

        public ObjectId Id { get; set; }  //La clave Primaria

		public DateTime CreateDate => Id.CreationTime;  //La fecha de Creacion del Registro
    }
}

