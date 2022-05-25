import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrosService } from '../services/libros.services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
})
export class LibrosComponent implements OnInit, OnDestroy {


  libros = [''];



  //Estamos realizando inyeccion de dependencia para que la clase component utilice los artefactos de LibrosService
  constructor (private librosService: LibrosService){


  }

  private libroSubscription = new Subscription();  //Este objeto nos permite controlar la subscripcion del observable


   //Se ejecuta despues del constructor
  ngOnInit(): void {
    this.libros= this.librosService.obtenerLibros();
    this.librosService.librosSubject.subscribe(()=>{
      this.libros = this.librosService.obtenerLibros();
    });  //Va a estar a la escucha
  }

  ngOnDestroy(): void {

    this.libroSubscription.unsubscribe();

  }


  eliminarLibro(libro: string) {



  }

  //Estamos llamando los metodos de la interfaz , se esta utilizando inyeccion de dependencias
  guardarLibro(f:any){
    if (f.valid){

      this.librosService.agregarLibro(f.value.nombreLibro);

    }
  }
}
