import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-libro',
  templateUrl: 'libro.component.html',
  styleUrls: ['libro.component.css'],
})
export class LibroComponent {
  @Input() tituloLibro: string | undefined;
  @Output() libroClicked = new EventEmitter(); //Si va a viajar a un componente superior tiene que ser output

  onClicked() {
    this.libroClicked.emit(); //Con esto el padre capturara el evento del hijo
  }
}
