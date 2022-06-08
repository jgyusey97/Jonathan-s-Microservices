import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Autor} from "./autor.model";

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {



  desplegarColumnas = ["nombre", "apellido", "gradoAcademico"];
   dataSource = new MatTableDataSource<Autor>();
  constructor() { }

  ngOnInit(): void {
  }

}
