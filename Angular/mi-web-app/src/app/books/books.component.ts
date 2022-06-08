import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit , OnDestroy,  AfterViewInit{
  bookData: Books[] = []; //Tenemos un arreglo de Libros

  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];

  dataSource = new MatTableDataSource<Books>(); //El source de los datos

  @ViewChild(MatSort)
  ordenamiento: MatSort = new MatSort() ;
  
  private bookSubscription?: Subscription;

  @ViewChild(MatPaginator) paginacion!:MatPaginator ;  //Para realizar la paginacion en la pagina de angular
  constructor(private booksService: BooksService, private dialog: MatDialog) {



  }

  
  hacerFiltro(filtro: Event) {

      this.dataSource.filter = (filtro.target as HTMLInputElement).value;
  }
  ngOnInit(): void {
    // this.bookData= this.booksService.obtenerLibros ();


    this.dataSource.data = this.booksService.obtenerLibros(); //Utilizamos los servicios para poder obtener la informacion
    
    //Creamos la subscripcion
    this.bookSubscription = this.booksService.booksSubject.subscribe(()=>{
        this.dataSource.data = this.booksService.obtenerLibros();
     });
  
  }


  //Este metodo se ejecuta cuando se destruye el componente
  ngOnDestroy(): void {
      this.bookSubscription?.unsubscribe();
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  //Metodo para abrir el dialogo
  abrirDialog(){
    this.dialog.open(BookNuevoComponent,{
      width:"350px"
    } );

  }
}
