import { Injectable } from "@angular/core";
import {Autor} from "./autor.model";
import { environment } from "src/environments/environment";  //La configuracion de los ambientes
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Subject } from "rxjs";


//Agregar el servicio en la raiz de la aplicacion
@Injectable ({

  providedIn:"root"
})
export class AutoresService{

  baseUrl =environment.baseUrl; //Url base la api que estamos consumiendo

  private autoresLista: Autor[] = [] //Lista de autores

private autoresSubject  = new Subject <Autor[]>();

  constructor(private http:HttpClient){


  }
  /*
    {autorId:1, nombre: "Vaxi", apellido:"Drez", gradoAcademico:"Ingeniero de Software"},

    {autorId:2, nombre: "Lorenzo", apellido:"Ramirez", gradoAcademico:"Matematica"},

    {autorId:3, nombre: "Jonathan", apellido:"Guzman", gradoAcademico:"Ingeniero de Sistemas"},
    {autorId:3, nombre: "Aloima", apellido:"Capote", gradoAcademico:"Teologa"}

  ];*/


   obtenerAutores(){

      //return this.autoresLista.slice();
      this.http.get<Autor[]>(this.baseUrl+'api/LibreriaAutor')
      .subscribe((data) =>{
        this.autoresLista = data;
        this.autoresSubject.next([...this.autoresLista]);
      });

   }
   obtenerActualListener(){

    return this.autoresSubject.asObservable();  //Este devuelve la data
   }

}
