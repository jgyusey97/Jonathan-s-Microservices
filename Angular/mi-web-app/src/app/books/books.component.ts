import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit , AfterViewInit{
  bookData: Books[] = []; //Tenemos un arreglo de Libros

  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];

  dataSource = new MatTableDataSource<Books>(); //El source de los datos
  
  @ViewChild(MatSort)
  ordenamiento: MatSort = new MatSort() ;
  constructor(private booksService: BooksService) {

    this.ordenamiento =  new MatSort();
  }
  hacerFiltro(filtro: Event) {

      this.dataSource.filter = (filtro.target as HTMLInputElement).value;
  }
  ngOnInit(): void {
    // this.bookData= this.booksService.obtenerLibros ();

    this.dataSource.data = this.booksService.obtenerLibros(); //Utilizamos los servicios para poder obtener la informacion
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;    
  }
  
}
