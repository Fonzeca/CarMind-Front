import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  Nombre: string;
  position: string;
  Fecha: string;
  symbol: string;
  todos: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Nombre: 'Formulario De Ingreso', Fecha: '25/10/21', symbol: 'Camion 01', position: 'Luis Martinez', todos: 'Completo'},
  {Nombre: 'Pedro Juarez', Fecha: '31/10/21', symbol: 'Camion 03', position: 'Pedro Juarez', todos: 'Licencia'},
  {Nombre: 'Mariano Lopez', Fecha: '04/10/21', symbol: 'Camion 05', position: 'Mariano Lopez', todos: 'Activo'},
  {Nombre: 'Luis Martinez', Fecha: '05/10/21', symbol: 'Camion 08', position: 'Luis Martinez', todos: 'Activo'},
  {Nombre: 'Jose Barto', Fecha: '16/10/21', symbol: 'Camion 02', position: 'José Barto', todos: 'Activo'},


];

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Fecha', 'symbol', 'position', 'todos'];
  dataSource = ELEMENT_DATA;




  constructor() { }

  ngOnInit(): void {
  }



}
