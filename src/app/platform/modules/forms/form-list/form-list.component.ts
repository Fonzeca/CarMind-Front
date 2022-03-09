import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent extends BaseComponent implements OnInit {

  filterInput: string = '';

  columns = 5;

  default:any = {
    "id": "empty",
    "nombre": "-",
    "nombre_empresa": "-",
    "administrador": "-"
  };

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
