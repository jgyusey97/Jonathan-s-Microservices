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



@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,  //Lo agregamos en la seccion de declarencios
    LibrosComponent,
    LibroComponent,
    InicioComponent  //Menu principal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  //Archivo que contiene las rutas
    FormsModule, 
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [LibrosService],  //En la seccion de providers agregamos los servicios
  bootstrap: [AppComponent]
})
export class AppModule { }
