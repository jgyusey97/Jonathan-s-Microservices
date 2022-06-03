import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';


//Este servicio es para el registro de los usuarios y el proceso del login
export class SeguridadService {
  private usuario: Usuario | any;

  registrarUsuario(usr: Usuario) {
    //Esta propiedad es para el registro del usuario
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellidos: usr.apellidos,
      username: usr.username,
      password:""
    };
  }

  //Este metodo sera utilizado para poder realizar el login
  login(loginData: LoginData) {
    this.usuario = {
      email: loginData.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: '',
      apellidos: '',
      username: '', //En blanco porque no marca
      password:""
    };
  }

  //Metodo para cerrar la sesion

  salirSesion() {
    this.usuario = null;
  }
}
