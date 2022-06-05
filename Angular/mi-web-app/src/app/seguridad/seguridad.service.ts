import { Subject } from 'rxjs';

import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
//Este servicio es para el registro de los usuarios y el proceso del login

@Injectable()
export class SeguridadService {
  seguridadCambio = new Subject<boolean>(); //Este es la instancia del booleano

   private usuario: Usuario | undefined | null ;  //Cuando no queremos inciar una variable



  constructor(private router: Router) {}
  registrarUsuario(usr: Usuario) {
    //Esta propiedad es para el registro del usuario
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellidos: usr.apellidos,
      username: usr.username,
      password: '',
    };

    this.seguridadCambio.next(true); //Notificar

    this.router.navigate(['/']); //Redireccionando al componente de incio
  }

  //Este metodo sera utilizado para poder realizar el login
  login(loginData: LoginData) {
    this.usuario = {
      email: loginData.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: '',
      apellidos: '',
      username: '', //En blanco porque no marca
      password: '',
    };
    this.seguridadCambio.next(true);

    this.router.navigate(['/']);
  }

  //Metodo para cerrar la sesion

  salirSesion() {
    this.usuario = null;

    this.seguridadCambio.next(false);

    this.router.navigate(['/login']); //Que me redireccione al componente Login
  }

  obtenerUsuario (){

    return { ...this.usuario}
  }

  onSesion(){

    return this.usuario!=null;

  }

}
