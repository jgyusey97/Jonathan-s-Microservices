import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Autor } from '../autores/autor.model';
import { AutoresService } from '../autores/autores.service';
import { BooksService } from './books.service';

@Component({
  selector: 'app-book-nuevo',
  templateUrl:'./book-nuevo.component.html',
})
export class BookNuevoComponent implements OnInit {
  selectAutor: string ="";
  selectAutorTexto: string ="";
  fechaPublicacion: string = "";


   autores : Autor [] = [];


  //Los servicios deben de ser agregados al constructor
  constructor(private bookService: BooksService, private dialogRef:MatDialog, private autoresService: AutoresService){

  }

  //Este se ejecuta despues del constructor de la clase
  ngOnInit(): void {
    //  this.autores = this.autoresService.obtenerAutores();
  }

  //MM-DD-YY (Por default)
  //DD-MM-YY (Formato Latino)
  @ViewChild(MatDatepicker) picker! :MatDatepicker<Date> ;



  //Metodo para poder guardar los libros

  guardarLibro( form: NgForm){

    if(form.valid){  //Solo realiza la insercion si la form valid es true


      this.bookService.guardarLibro({
        libroId:1,
        descripcion:form.value.descripcion,
        titulo: form.value.titulo,
        autor: this.selectAutorTexto,
        precio: form.value.precio,
        fechaPublicacion : new Date(this.fechaPublicacion)
      });
      this.dialogRef.closeAll();
    }



  }

  selected(event: MatSelectChange){
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;

  }


}
