import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario.component';

//Libreria para utilizar ngModulo
import { FormsModule } from '@angular/forms';
import { LibrosComponent } from './libros/libros.component';
import { LibroComponent } from './libro/libro.component';
import { LibrosService } from './services/libros.services';
import { InicioComponent } from './inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { LoginComponent } from './seguridad/login/login.component';
import { FlexLayoutModule} from '@angular/flex-layout';
import { BarraComponent } from './navegacion/barra/barra.component';
import { MenuListaComponent } from './navegacion/menu-lista/menu-lista.component';
import { SeguridadService } from './seguridad/seguridad.service';
import { BooksComponent } from './books/books.component';  //Servicio de seguridad
import { BooksService } from './books/books.service';
import { BookNuevoComponent } from './books/book-nuevo.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AutoresComponent } from './autores/autores.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,  //Lo agregamos en la seccion de declarencios
    LibrosComponent,
    LibroComponent,
    InicioComponent,
    RegistrarComponent,
    LoginComponent,
    BarraComponent,
    MenuListaComponent,
    BooksComponent , //Menu principal
    BookNuevoComponent, AutoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  //Archivo que contiene las rutas
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [LibrosService, SeguridadService, BooksService, {provide: MAT_DATE_LOCALE, useValue:'es-ES'}],  //En la seccion de providers agregamos los servicios
  bootstrap: [AppComponent],
  entryComponents:[BookNuevoComponent]
})
export class AppModule { }
