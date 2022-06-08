import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { BooksService } from './books.service';

@Component({
  selector: 'app-book-nuevo',
  templateUrl:'./book-nuevo.component.html',
})
export class BookNuevoComponent {
  selectAutor: string ="";
  selectAutorTexto: string ="";
  fechaPublicacion: string = "";


  constructor(private bookService: BooksService, private dialogRef:MatDialog){

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
