import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { Defect } from 'src/app/platform/interfaces/maintenance';
import { MaintenanceService } from 'src/app/platform/services/maintenance.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-maintenance-defect-list',
  templateUrl: './maintenance-defect-list.component.html',
  styleUrls: ['./maintenance-defect-list.component.scss']
})
export class MaintenanceDefectListComponent extends BaseComponent implements OnInit {

  sortedData: Defect[] = [];
  defects : Defect[] = [];

  searchText = '';

  isShowingResolved = false;

  public prioritys = [
    "Indefinida",
    "Baja",
    "Media",
    "Alta",
  ];
  _priority:string[] = [];
  set priority (value:any){
    this._priority = value;

  }
  get priority(){
    return this._priority;
  }


  constructor(public router :Router,public maintenanceService: MaintenanceService) {
    super();

    maintenanceService.getDefects().subscribe(
      response => {
        this.defects = response;
        this.defects.forEach(defect => {
          var fecha : any = defect.fecha_creacion;
          var parsedDateTime : Date = new Date(fecha[0],fecha[1],fecha[2], fecha[3], fecha[4], fecha[5]);
          defect.fecha_creacion = parsedDateTime;
          this.priority.push(this.prioritys[defect.prioridad]);
        });
        this.sortedData = this.defects.slice();
      } 
    );
   }

  ngOnInit(): void {
  }

  sortData(sort: Sort) {
    const data = this.defects.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
            return compare(a.id, b.id, isAsc);
        case 'prioridad':
            return compare(this.prioritys[a.prioridad], this.prioritys[b.prioridad], isAsc);
        case 'fecha':
            return isAsc ? a.fecha_creacion.getTime() - b.fecha_creacion.getTime() : b.fecha_creacion.getTime() - a.fecha_creacion.getTime();
        case 'defecto':
            return compare(a.defecto, b.defecto, isAsc);
        case 'conductor':
            return compare(a.nombre_ape_usuario, b.nombre_ape_usuario, isAsc);
        case 'vehiculo':
            return compare(a.vehiculo, b.vehiculo, isAsc);
        case 'estado':
            return compare(a.estado, b.estado, isAsc);
        default:
            return 0;
          }  
      });

    this.priority = [];
    this.sortedData.forEach(defect => {
        this.priority.push(this.prioritys[defect.prioridad]);
    });

    function compare(a: number | string , b: number | string , isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

  getStateColor(state : string){
    if(state === "Pendiente") return "#FFC350";
    if(state === "En progreso") return "#3ADCFF";
    return "#62FF3A";
  }

  getFecha(fecha : any){
    var date : string = fecha.toISOString().substring(0,10);
    var time : string = fecha.toTimeString().substring(0,8);
    return date + " " + time;
  }

  onPriorityChange(defectId : number, newPriority : string){
    var newPriorityIndex = this.prioritys.indexOf( newPriority);
    this.maintenanceService.updatePriorityDefectById(defectId.toString(), newPriorityIndex).subscribe();
  }

  showResolved(){
    this.isShowingResolved = !this.isShowingResolved;
    
    if(this.isShowingResolved) this.sortedData = this.defects.filter(defect => defect.estado === 'resuelto')
    else this.sortedData = this.defects;
  }

  viewDetails(defect : Defect){{
    this.router.navigate([this.getAppRoutes.platform.maintenance.details.route], {state:{defect: defect}});
  }}


}
