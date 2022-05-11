using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Servicios.api.Libreria.Core.Entities
{
	public interface IDocument
	{
	   [BsonId]
	   [BsonRepresentation(BsonType.String)]
	   ObjectId Id { get; set; }
       DateTime CreateDate { get; }

	}
}

