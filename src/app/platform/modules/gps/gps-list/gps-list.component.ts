import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { VehiclesImeisRequest, VehicleState } from 'src/app/platform/interfaces/gps_data';
import { GpsService } from 'src/app/platform/services/gps.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-gps-list',
  templateUrl: './gps-list.component.html',
  styleUrls: ['./gps-list.component.scss']
})
export class GpsListComponent extends BaseComponent implements OnInit {

  vehicles!:VehicleState[];

  constructor(public router:Router, public gps_service: GpsService, public vehicle_service: VehiclesService) {
    super();

    const vehiclesImeisRequest: VehiclesImeisRequest = {
      imeis: ['867730050816697','123123312'],
    };

    this.gps_service.getVehiclesStateByImeis(vehiclesImeisRequest).pipe(
      tap((response) => {
        vehicle_service.getAll().subscribe((vehicles)=>{
          var vehiclesStates = vehicles.splice( vehicles.findIndex(v => v.imei !== undefined), 1).map((vehicle) => {
            var fullDetailedVehicle : VehicleState = response.find(v => v.imei == vehicle.imei)!;
            fullDetailedVehicle!.nombre = vehicle.nombre;
            fullDetailedVehicle!.patente = vehicle.patente;
            return fullDetailedVehicle;
          });
          this.vehicles = vehiclesStates;
        });
       

      })
    ).subscribe();
   }

  ngOnInit(): void {
  }

  detail(vehicle: VehicleState){
    this.router.navigate([this.getAppRoutes.platform.gps.details.route], {state:{vehicle: vehicle}})
  }

}
