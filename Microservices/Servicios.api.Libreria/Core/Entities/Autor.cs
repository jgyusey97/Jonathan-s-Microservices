using MongoDB.Bson;  //Para crear los BSON
using MongoDB.Bson.Serialization.Attributes;  //Libreria para MongoDB
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servicios.api.Libreria.Core.Entities
{

    //Las clases que voy a mapear de mongo
    public class Autor
    {
        [BsonId]
        [BsonRepresentation (BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("nombre")]  //Elemento o propiedad de un Bson
        public string Nombre { get; set; }

        [BsonElement("apellido")]
        public string Apellido { get; set; }

        [BsonElement("gradoAcademico")]
        public string GradoAcademico { get; set; }


    }
}
