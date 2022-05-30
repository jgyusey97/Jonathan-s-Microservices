//Las librerias que importamos en angular
import { Component } from '@angular/core';



//Decorator
@Component({
  selector: 'app-root', //EL nombre de componente
  templateUrl: './app.component.html',  //Indica el componente
  styleUrls: ['./app.component.css'] //El estilo de la pagina
})
export class AppComponent {
   abrirMenu = false;
}
