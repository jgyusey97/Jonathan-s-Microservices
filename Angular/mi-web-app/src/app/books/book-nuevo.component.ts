import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Autor } from '../autores/autor.model';
import { AutoresService } from '../autores/autores.service';
import { BooksService } from './books.service';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: './book-nuevo.component.html',
})
export class BookNuevoComponent implements OnInit, OnDestroy {
  selectAutor: string = '';
  selectAutorTexto: string = '';
  fechaPublicacion: string = '';

  autores: Autor[] = [];

  //Los servicios deben de ser agregados al constructor
  constructor(
    private bookService: BooksService,
    private dialogRef: MatDialog,
    private autoresService: AutoresService
  ) {}

  autorSubscripcion?: Subscription;

  //Este se ejecuta despues del constructor de la clase
  ngOnInit(): void {
    //  this.autores = this.autoresService.obtenerAutores();

    this.autoresService.obtenerAutores();
    this.autorSubscripcion = this.autoresService
      .obtenerActualListener()
      .subscribe((autoresBackend: Autor[]) => {
        this.autores = autoresBackend;
      });
  }

  ngOnDestroy(): void {
    this.autorSubscripcion?.unsubscribe();
  }

  //MM-DD-YY (Por default)
  //DD-MM-YY (Formato Latino)
  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;

  //Metodo para poder guardar los libros

  guardarLibro(form: NgForm) {
    if (form.valid) {
      //Solo realiza la insercion si la form valid es true
      const autorRequest = {
        id: this.selectAutor, //id Vinculo con el control del combo box del autor
        nombreCompleto: this.selectAutorTexto, //Label del combo box
      };

      const libroRequest = {
        id: null,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autorRequest,
        precio: parseFloat(form.value.precio),
        fechaPublicacion: new Date(this.fechaPublicacion),
      };

      this.bookService.guardarLibro(libroRequest);
      this.autorSubscripcion = this.bookService
        .guardarLibroListener()
        .subscribe(() => {
          this.dialogRef.closeAll();
        });
    }
  }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }
}
