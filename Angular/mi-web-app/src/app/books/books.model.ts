export interface Books {

 libroId: number;
 titulo : string;
 descripcion : string;
 precio: number;
 fechaPublicacion?:Date  //Esto quiere decir que acepta nulos
 autor : string;
}


