import { Books } from "./books.model";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { PaginationBook } from "./pagination-books.module";
import { Injectable } from "@angular/core";


@Injectable ({
providedIn:"root"

})

export class BooksService{

baseUrl =  environment.baseUrl;

private bookLista : Books [] = [];

bookPagination?: PaginationBook;

bookPaginationSubject = new Subject<PaginationBook>();



 booksSubject = new Subject();

constructor (private http:HttpClient){


}

//Se volvio un metodo de tipo void
obtenerLibros(libroPorPagina:number, paginaActual:number, sort: string, sortDireccion:string, filterValue:any){

  const request ={
  pageSize:libroPorPagina,
  page: paginaActual,
  sort,
  sortDireccion,
  filterValue

  };

  this.http.post<PaginationBook>(this.baseUrl+ 'api/Libro/Pagination', request)
  .subscribe((response)=>{
    this.bookPagination = response;
   this.bookPaginationSubject.next(this.bookPagination);
  });

 // return this.bookLista.slice(); //Retorna una copia de la lista original
}



//Metodo que devuelve la data de los libros
obtenerActualListener(){

  return this.bookPaginationSubject.asObservable();

}



//Vamos a guardar el libro por http
guardarLibro(book: any){


  this.http.post(this.baseUrl+'api/Libro', book)
  .subscribe((response)=>{
    this.booksSubject.next(null);
  });
  //Notificamos



}

guardarLibroListener(){

  return this.booksSubject.asObservable(); //Retorna

}







}
