import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Defect } from 'src/app/platform/interfaces/maintenance';
import { MaintenanceService } from 'src/app/platform/services/maintenance.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-maintenance-defect-details',
  templateUrl: './maintenance-defect-details.component.html',
  styleUrls: ['./maintenance-defect-details.component.scss']
})
export class MaintenanceDefectDetailsComponent extends BaseComponent implements OnInit {

  defect: Defect | undefined;
  public images?: any[];

  public prioritys = [
    "Indefinida",
    "Baja",
    "Media",
    "Alta",
  ];
  _priority:string = 'Indefinida';
  set priority (value:any){
    this._priority = value;

  }
  get priority(){
    return this._priority;
  }

  
  flicker: Subject<any> = new Subject();
  slideIndex: number = 0;
  slideCant: number = 4;


  constructor(public router: Router, public maintenanceService: MaintenanceService) {
    super();

    if (router.getCurrentNavigation() === null || router.getCurrentNavigation()!.extras.state! === undefined) {
      router.navigateByUrl(this.getAppRoutes.platform.maintenance.defects.route);
    } else {
      this.defect = this.router.getCurrentNavigation()!.extras.state!['defect'];
      this.priority = this.prioritys[this.defect!.prioridad];
    }
    
  }

  ngOnInit(): void {
  }

  onPriorityChange(newPriority : string){
    var newPriorityIndex = this.prioritys.indexOf( newPriority);
    this.maintenanceService.updatePriorityDefectById(this.defect!.id.toString(), newPriorityIndex).subscribe();
  }

  onUpdateState(newState : string){
    this.maintenanceService.updateStateDefectById(this.defect!.id.toString(), newState).subscribe(
      _ => {
        this.defect!.estado = newState;
      }
    );
  }

  getFecha(fecha : any){
    var date : string = fecha.toISOString().substring(0,10);
    var time : string = fecha.toTimeString().substring(0,8);
    return date + " " + time;
  }

  getStateColor(state : string){
    if(state === "Pendiente") return "#FFC350";
    if(state === "En progreso") return "#3ADCFF";
    return "#62FF3A";
  }

  viewImage(image:any){
    console.log("viewing image")
  }

  getImageSlider(images:any) {
    return images.slice(this.slideIndex, this.slideIndex + this.slideCant);
  }

  nextSlide(image:any) {
    if ((this.slideIndex+this.slideCant) !== image.length &&  image.length!==1) {
      this.slideIndex++;
      this.flikear();
    }
  }

  previousSlide() {
    if (this.slideIndex !== 0) {
      this.slideIndex--;
      this.flikear();
    }
  }

  flikear() {
    setTimeout(() => this.flicker.next(null), 0);
  }

}
