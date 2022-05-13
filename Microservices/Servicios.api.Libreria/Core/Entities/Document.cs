using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Servicios.api.Libreria.Core.Entities  
{
	public class Document: IDocument
	{

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]  //Representacion Numerica del ID

        public string Id { get; set; }

        public DateTime CreatedDate => DateTime.Now;//La fecha de Creacion del Registro


        
    }
}

