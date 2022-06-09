import { Injectable } from "@angular/core";
import {Autor} from "./autor.model";




//Agregar el servicio en la raiz de la aplicacion
@Injectable ({

  providedIn:"root"
})
export class AutoresService{

  private autoresLista: Autor[] = [

    {autorId:1, nombre: "Vaxi", apellido:"Drez", gradoAcademico:"Ingeniero de Software"},
    
    {autorId:2, nombre: "Lorenzo", apellido:"Ramirez", gradoAcademico:"Matematica"},
    
    {autorId:3, nombre: "Jonathan", apellido:"Guzman", gradoAcademico:"Ingeniero de Sistemas"},
    {autorId:3, nombre: "Aloima", apellido:"Capote", gradoAcademico:"Teologa"}

  ];


   obtenerAutores(){

      return this.autoresLista.slice();

   }

}