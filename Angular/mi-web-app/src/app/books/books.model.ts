export interface Books {

 id: string;
 titulo : string;
 descripcion : string;
 precio: number;
 fechaPublicacion?:Date ; //Esto quiere decir que acepta nulos
 autor : {

  id: string,
  nombreCompleto: string,

 };
}





