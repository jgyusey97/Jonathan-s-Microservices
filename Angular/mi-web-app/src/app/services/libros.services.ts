//Esto es un archivo de tipo typescript

import { Subject } from "rxjs";  //Observable

//Se realiza inyeccion de dependencia
export class LibrosService {
  //Creamos un arreglo que almacene una lista de libros

  private libros = ['Libro de Carlos Amaguaya', 'Libro de Jonathan', 'Libro de Aloima', 'Libro de mi Mami'];
  librosSubject  = new Subject();



   //Este metodo nos permite agregar los libros
  agregarLibro(libroNombre: string) {
    this.libros.push(libroNombre); //Agregamos el nuevo elemento a la coleccion de javascript
    this.librosSubject.next(null);
  }

 //Metodo para eliminarLibro
 eliminarLibro(libroNombre : string){ 
  
  this.libros=this.libros.filter(x=>x!==libroNombre);  //Esta es la validacion para poder eliminar los libros 
  //Cada vez que elimino algo debo de agregarlo a un evento para que pueda ser escuchada la accion
  
  this.librosSubject.next(null);

  

 }


  //Retornamos la lista de los libros
  obtenerLibros() {
    return [...this.libros]; //El sprit operador te permite retornar no solo los elementos existentes , sino los que se estan agregando a el
  }
}




