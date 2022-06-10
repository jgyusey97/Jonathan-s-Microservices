import { Books } from "./books.model";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
export class BooksService{

baseUrl =  environment.baseUrl;

private bookLista : Books [] = [];






 booksSubject = new Subject <Books>();

obtenerLibros(){
  return this.bookLista.slice(); //Retorna una copia de la lista original
}


guardarLibro(book: Books){

   //Agregamos el objeto a la lista pero este objeto debe de ser actualizado
  this.bookLista.push(book);

  //Notificamos
  this.booksSubject.next(book);
}





}
