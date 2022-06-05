import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  bookData: Books[] = []; //Tenemos un arreglo de Libros

  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];

  dataSource = new MatTableDataSource<Books>(); //El source de los datos

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    // this.bookData= this.booksService.obtenerLibros ();

    this.dataSource.data = this.booksService.obtenerLibros(); //Utilizamos los servicios para poder obtener la informacion
  }
}
