import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  Nombre: string;
  position: string;
  Fecha: string;
  symbol: string;
  todos: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Nombre: 'Luis Martinez', Fecha: '25/10/21', symbol: 'Camion 01', position: 'Conductor', todos: 'Activo'},
  {Nombre: 'Pedro Juarez', Fecha: '31/10/21', symbol: 'Camion 03', position: 'Administrador', todos: 'Licencia'},
  {Nombre: 'Mariano Lopez', Fecha: '04/10/21', symbol: 'Camion 05', position: 'Conductor', todos: 'Activo'},
  {Nombre: 'Luis Martinez', Fecha: '05/10/21', symbol: 'Camion 08', position: 'Administrador', todos: 'Activo'},
  {Nombre: 'Jose Barto', Fecha: '16/10/21', symbol: 'Camion 02', position: 'Conductor', todos: 'Activo'},


];

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Fecha', 'symbol', 'position', 'todos'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
