import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario.component';

//Libreria para utilizar ngModulo
import { FormsModule } from '@angular/forms';
import { LibrosComponent } from './libros/libros.component';
import { LibroComponent } from './libro/libro.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,  //Lo agregamos en la seccion de declarencios
    LibrosComponent,
    LibroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
