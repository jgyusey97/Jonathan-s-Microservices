//Las librerias que importamos en angular
import { Component , OnInit} from '@angular/core';

import { SeguridadService } from './seguridad/seguridad.service';




//Decorator
@Component({
  selector: 'app-root', //EL nombre de componente
  templateUrl: './app.component.html',  //Indica el componente
  styleUrls: ['./app.component.css'] //El estilo de la pagina
})
export class AppComponent {
   abrirMenu = false;
   constructor(private seguridadService:SeguridadService){

   }

   ngOnInit(){
     this.seguridadService.cargarUsuario()  //Se busca dentro de almacenamiento buscara para iniciar la sesion
   }
}
