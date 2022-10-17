import { Component, OnInit } from '@angular/core';
import { Defect } from 'src/app/platform/interfaces/maintenance';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-maintenance-defect-list',
  templateUrl: './maintenance-defect-list.component.html',
  styleUrls: ['./maintenance-defect-list.component.scss']
})
export class MaintenanceDefectListComponent extends BaseComponent implements OnInit {

  defects : Defect[] = [];
  searchText = '';

  public prioritys = [
    "Indefinida",
    "Baja",
    "Media",
    "Alta",
  ];
  _priority:string = "Indefinida";
  set priority (value:any){
    this._priority = value;

  }
  get priority(){
    return this._priority;
  }


  constructor() {
    super();
    this.defects.push({
      id: 1,
      fecha_creacion: '29/09/2020 15:16',
      prioridad: 'indefinido',
      defecto: 'Luces traseras',
      conductor: 'Alexis Fonzo',
      vehiculo: 'La 05',
      estado: 'Pendiente'
    })

    var priorityIndex = this.prioritys.indexOf( this.defects[0].prioridad);
    this.priority =  this.prioritys[priorityIndex];
   }

  ngOnInit(): void {
  }


  getStateColor(state : string){
    if(state === "Pendiente") return "#FFC350";
    if(state === "En progreso") return "#3ADCFF";
    return "#62FF3A";
  }
}
