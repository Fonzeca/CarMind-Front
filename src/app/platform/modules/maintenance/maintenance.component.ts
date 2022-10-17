import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from '../../shared/components/base.component';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent extends BaseComponent implements OnInit{

  defectViewSelected : boolean = true;


  changeToVehicles : any;

  constructor(public router:Router) {
    super();

    if(this.router.url.includes('service')) this.defectViewSelected = false;
    
    this.changeRoute(this.defectViewSelected);

    //Cuando se está en la pestaña de mantenimiento, y se clickea nuevamente en mantenimiento, no se llama al constructor por lo que no se va ni al defect-list
    // ni a los service Y queda la pantalla vacía, con este obserber, cuando se detecta esta ruta se redirige a la defect-list
    this.changeToVehicles = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          if(event.url === "/platform/maintenance") {
              this.changeRoute(true);
          }
      }
    });
  }
  
  ngOnInit(): void {
  }

  override ngOnDestroy(): void {
      this.changeToVehicles.unsubscribe();
  }


  changeRoute(isDefectPressed : boolean){
    this.defectViewSelected = isDefectPressed;
    if(this.defectViewSelected){
      this.router.navigate([this.getAppRoutes.platform.maintenance.defects.route]);
    }else{
      this.router.navigate([this.getAppRoutes.platform.maintenance.service.route]);
    }
  }


}
