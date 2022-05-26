import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { LibroComponent } from './libro/libro.component';
import { LibrosComponent } from './libros/libros.component';

const routes : Routes= [
 {path:'', component:InicioComponent}, //La ruta de los componentes

 {path:'libros',component:LibrosComponent }

]; //Dentro de este arreglo de Rutas




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})


export class AppRoutingModule {


 }
