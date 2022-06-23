import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private seguridadService: SeguridadService) {}  //Inyeccion de dependencia

  ngOnInit(): void {}

  //Metodo para realizar el login, este consumira el servicio que fue creado para poder realizar el login


  loginUsuario(formlogin: NgForm) {

   this.seguridadService.login({
     email: formlogin.value.email,
     password : formlogin.value.password
    });
  }
}
