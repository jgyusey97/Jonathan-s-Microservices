import { Component, Input, EventEmitter, Output } from '@angular/core';
import { LibrosService } from '../services/libros.services';
@Component({
  selector: 'app-libro',
  templateUrl: 'libro.component.html',
  styleUrls: ['libro.component.css'],
})
export class LibroComponent {
  @Input() tituloLibro: string ="";
  @Output() libroClicked = new EventEmitter(); //Si va a viajar a un componente superior tiene que ser output
  

  //Creamos el objeto ya instanciado
constructor(private librosService:LibrosService){ //Cuando se pasa algo en un argumento lo almacena la clase principal

}

 //Con la inyeccion de dependencias podemos realizar la eliminacion por medio de la interfaz que estamos inyectando

  onClicked() {

  this.librosService.eliminarLibro(this.tituloLibro);
  }
}
