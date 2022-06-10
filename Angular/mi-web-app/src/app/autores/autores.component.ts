import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Autor } from './autor.model';
import { AutoresService } from './autores.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit, OnDestroy {
  desplegarColumnas = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();

  private autorSubscripcion?: Subscription;
  constructor(private autoresServices: AutoresService) {}

  ngOnInit(): void {
    this.autoresServices.obtenerAutores();
    this.autorSubscripcion = this.autoresServices
      .obtenerActualListener()
      .subscribe((autores: Autor[]) => {
        this.dataSource.data = autores;
      });
  }
  ngOnDestroy(): void {
    this.autorSubscripcion?.unsubscribe();
  }
}
