import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleState } from 'src/app/platform/interfaces/gps_data';
import { GpsService } from 'src/app/platform/services/gps.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './gps-vehicle-list.component.html',
  styleUrls: ['./gps-vehicle-list.component.scss']
})
export class GpsVehicleListComponent extends BaseComponent implements OnInit {

  @Input() vehiclesStates!:VehicleState[];
  @Output() moveCameraEvent = new EventEmitter<any>();

  itemSelected : string | null = null;
  searchText = '';

  constructor(public router:Router, public gps_service: GpsService) {
    super();
  }

  ngOnInit(): void {
    this.gps_service.map?.addListener('dragstart', () => {
      this.itemSelected = null;
    })
  }

  override ngOnDestroy(): void {
    this.gps_service.map?.unbind('dragstart');
  }

  detail(vehicle: VehicleState){
    this.gps_service.isInDetails = true;
    for (const [imei, marker] of Object.entries(this.gps_service.markers)) { 
      if(imei !== vehicle.imei){
        marker.setMap(null);
        delete this.gps_service.markers[imei]
      }
    }
    this.router.navigate([this.getAppRoutes.platform.gps.vehicles.details.route], {state:{vehicle: vehicle}})
  }

  
  selectVehicle(imei : string){
    this.itemSelected = imei;
  }

  moveCameraToVehicle(latitud: number, longitud:number){
    if(this.gps_service.isInDetails) return;
    console.log("MoveCameraToVehicle");
    this.moveCameraEvent.emit([latitud, longitud]);
  }

}
