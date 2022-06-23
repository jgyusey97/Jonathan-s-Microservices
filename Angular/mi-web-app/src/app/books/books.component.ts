import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo.component';
import { Subscription } from 'rxjs';
import { PaginationBook } from './pagination-books.module';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, OnDestroy, AfterViewInit {
  bookData: Books[] = []; //Tenemos un arreglo de Libros
  timeout: any = null;
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];

  dataSource = new MatTableDataSource<Books>(); //El source de los datos

  @ViewChild(MatSort)
  ordenamiento: MatSort = new MatSort();

  private bookSubscription?: Subscription;

  @ViewChild(MatPaginator) paginacion!: MatPaginator; //Para realizar la paginacion en la pagina de angular

  totalLibros = 0;
  librosPorPagina = 2;
  paginaCombo = [1, 2, 5, 10];
  paginActual = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue:any;

  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  eventoPaginador(event: PageEvent):void {
    this.librosPorPagina = event.pageSize;
    this.paginActual = event.pageIndex + 1;
    this.booksService.obtenerLibros(
      this.librosPorPagina,
      this.paginActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }



  hacerFiltro(filtro: any):void {
    clearTimeout(this.timeout);

    const $this = this;
    this.timeout = setTimeout( () =>{
      if (filtro.keyCode != 13) {
        const filterValueLocal = {
          propiedad: 'titulo', //Ordenado por el libro
          valor: filtro.target.value,
        };

        $this.filterValue=filterValueLocal;
        $this.booksService.obtenerLibros(
          $this.librosPorPagina,
          $this.paginActual,
          $this.sort,
          $this.sortDirection,
          filterValueLocal
        );
        console.log("si fue bro");
      };
    }, 1000); //Esta operacion se va ejecutar cuando el usuario deje de escribir por mas de 1 segundo

    this.dataSource.filter = (filtro.target as HTMLInputElement).value;
  }
  ngOnInit(): void {
    this.booksService.obtenerLibros(
      this.librosPorPagina,
      this.paginActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
   this.bookSubscription= this.booksService
      .obtenerActualListener()
      .subscribe((pagination: PaginationBook) => {
        this.dataSource = new MatTableDataSource<Books>(pagination.data);
        this.totalLibros = pagination.totalRows;
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
  abrirDialog() {
    const dialogRef = this.dialog.open(BookNuevoComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.booksService.obtenerLibros(
        this.librosPorPagina,
        this.paginActual,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
    });
  }
  //Este metodo es para Ordenar los datos conforme a los elementos de filtros de la pantalla
  ordenarColumna(event: Sort) {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.booksService.obtenerLibros(
      this.librosPorPagina,
      this.paginActual,
      event.active,
      event.direction,
      this.filterValue
    );
  }
}
