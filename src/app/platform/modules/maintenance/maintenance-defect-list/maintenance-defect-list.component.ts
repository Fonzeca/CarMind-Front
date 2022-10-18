import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { Defect } from 'src/app/platform/interfaces/maintenance';
import { MaintenanceService } from 'src/app/platform/services/maintenance.service';
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
  _priority:string[] = [];
  set priority (value:any){
    this._priority = value;

  }
  get priority(){
    return this._priority;
  }


  constructor(public maintenanceService: MaintenanceService) {
    super();

    maintenanceService.getDefects().subscribe(
      response => {
        this.defects = response;
        this.defects.forEach(defect => {
          this.priority.push(this.prioritys[defect.prioridad]);
        });
      } 
    );

    //var priorityIndex = this.prioritys.indexOf( this.defects[0].prioridad);
    //this.priority =  this.prioritys[priorityIndex];
   }

  ngOnInit(): void {
  }


  getStateColor(state : string){
    if(state === "Pendiente") return "#FFC350";
    if(state === "En progreso") return "#3ADCFF";
    return "#62FF3A";
  }

  getFecha(fecha : any){
    var dateTime : Date = new Date(fecha[0],fecha[1],fecha[2], fecha[3], fecha[4], fecha[5]);
    var date : string = dateTime.toISOString().substring(0,10);
    var time : string = dateTime.toTimeString().substring(0,8);
    return date + " " + time;
  }

  onPriorityChange(defectId : number, newPriority : string){
    var newPriorityIndex = this.prioritys.indexOf( newPriority);
    this.maintenanceService.updatePriorityDefectById(defectId.toString(), newPriorityIndex).subscribe();
  }

}
