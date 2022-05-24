//Lo primero que se debe de realizar es importar las librerias de angular

import {Component} from '@angular/core'



//Luego creamos el decorator

@Component({

  selector:'app-usuario',  //Nombre del componente para ser utilizado
  templateUrl:'./usuario.component.html'
})


//Registramos el componente dentro del core de nuestra aplicacion
export class UsuarioComponent{

  usuarios = ['Luis', 'Fernando','Maria'];
  usuarioNombre = '';
  visible =false;

 constructor (){

  setTimeout(
   ()=>{this.visible=true}

    , 3000
  );

 }


  onAgregarUsuario(){
    //Cada vez que agreguemos algo en la caja de texto y la agregamos en el arreglo
    this.usuarios.push(this.usuarioNombre);

  }

}
