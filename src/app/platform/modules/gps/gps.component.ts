import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';


import { GpsService } from 'src/app/platform/services/gps.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent extends BaseComponent implements OnInit {

  vehicleViewSelected : boolean = true;

  constructor(public router:Router, public gps_service: GpsService) {
    super();

    if(this.router.url.includes('zones')) this.vehicleViewSelected = false;
    
    this.changeRoute(this.vehicleViewSelected);
  }
  
  ngOnInit(): void {
  }

  changeRoute(isVehiclePressed : boolean){
    this.vehicleViewSelected = isVehiclePressed;
    if(this.vehicleViewSelected){
      this.router.navigate([this.getAppRoutes.platform.gps.vehicles.route]);
    }else{
      this.router.navigate([this.getAppRoutes.platform.gps.zones.route]);
    }
  }

  isNotInDetails(){
    return !this.router.url.includes('details');
  }

}
