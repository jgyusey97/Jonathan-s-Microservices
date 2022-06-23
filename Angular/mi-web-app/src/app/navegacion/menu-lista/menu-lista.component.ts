import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { SeguridadService } from '../../seguridad/seguridad.service';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css'],
})
export class MenuListaComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter();

  estadoUsuario: boolean | undefined;

  usuarioSubscription!: Subscription;

  constructor(private seguridadService: SeguridadService) {}

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadService.seguridadCambio.subscribe(
      (status) => {
        this.estadoUsuario = status;
      }
    );
  }

  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe();
  }
  OnCerrarMenu() {
    this.menuToggle.emit();
  }
  terminarSesionMenu() {
    this.OnCerrarMenu();
    this.seguridadService.salirSesion();
  }

  navigatetoLibros() {
    this.OnCerrarMenu();
        this.seguridadService.NavigatoPage('/books');
  }

  navigatetoAutores(){

    this.OnCerrarMenu();
    this.seguridadService.NavigatoPage('/autores');
  }
}
