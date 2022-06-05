import { Books } from "./books.model";


export class BooksService{

private bookLista : Books [] = [



 {libroId:1, titulo:"Algoritmos", descripcion :"Libro basico", autor:"Vaxi Drez", precio:18},
 {libroId:1, titulo:"Angular", descripcion :"Libro intermedio", autor:"Vaxi Drez", precio:25},
 {libroId:1, titulo:"Flutter", descripcion :"Master", autor:"Vaxi Drez", precio:30},
 {libroId:1, titulo:"ASP.NET", descripcion :"Asp.Net", autor:"Vaxi Drez", precio:99},
 {libroId:1, titulo:"Java", descripcion :"Asp.Net", autor:"Vaxi Drez", precio:99},

 ];


obtenerLibros(){
  return this.bookLista.slice(); //Retorna una copia de la lista original
}



}
