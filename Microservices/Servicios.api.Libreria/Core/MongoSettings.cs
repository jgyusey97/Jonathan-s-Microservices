using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servicios.api.Libreria.Core
{

    //Configuraciozn para la base de datos de Mongo
    public class MongoSettings
    {
        public string ConnectionString { get; set; }
        public string DataBase { get; set; }
    }
}
