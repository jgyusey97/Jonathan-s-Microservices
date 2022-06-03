import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit {
  @Output() menuToggle =new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  OnCerrarMenu(){
  
    this.menuToggle.emit();
  }
}
