import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css'],
})
export class BarraComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>(); //Esto es como el stream de flutter

 estadoUsuario :boolean =false;  //Variable que almacena el estado del usuario


  usuarioSubscription!: Subscription;

  //Primero ejecuta el constructor
  constructor(private seguridadServicio: SeguridadService) {}



  //Se ejecuta despues del constructor
  ngOnInit(): void {


    //Este objeto lo utilizamos para notificar, con esto estamos obteniendo el estado del usuario

   this.usuarioSubscription= this.seguridadServicio.seguridadCambio.subscribe(status=>{

    this.estadoUsuario = status;

    });
  }

  //Este metodo se ejecuta cuando se cierra el componente
  ngOnDestroy(): void {

    this.usuarioSubscription.unsubscribe();


  }



  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  terminarSesion(){
   this.seguridadServicio.salirSesion(); //Se redirecciona

  }
}
