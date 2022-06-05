import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { InicioComponent } from './inicio.component';
import { LibroComponent } from './libro/libro.component';
import { LibrosComponent } from './libros/libros.component';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { SeguridadRouter } from './seguridad/seguridad.router';

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [SeguridadRouter] }, //La ruta de los componentes

  { path: 'libros', component: LibrosComponent },

  { path: 'registrar', component: RegistrarComponent },

  { path: 'login', component: LoginComponent },

  { path: 'books', component: BooksComponent },

]; //Dentro de este arreglo de Rutas

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

  providers: [SeguridadRouter], //Este se encargara del control de las rutas
})
export class AppRoutingModule {}
