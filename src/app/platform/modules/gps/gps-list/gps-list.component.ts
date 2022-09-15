import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Easing, Tween, update } from '@tweenjs/tween.js';
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
            
            this.drawVehicleMarker(fullDetailedVehicle.latitud, fullDetailedVehicle.longitud)

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

  
  drawVehicleMarker(latitud:number, longitud:number){
    var marker :  google.maps.Marker = new google.maps.Marker({
      map: this.gps_service.map,
      position: {
        lat: latitud,
        lng: longitud,
      },
    });
    google.maps.event.addListener(marker, 'click', (function(map) {
      return function() {

        var cameraOptions = {
          tilt: map?.getTilt(),
          zoom: map?.getZoom(),
          heading: map?.getHeading(),
          lat:map?.getCenter()!.lat()!,
          lng: map?.getCenter()!.lng()!,
        }

        new Tween(cameraOptions)
        .to({lat: latitud, lng: longitud, zoom: 10, tilt: 0, heading: 0}, 3000)
        .easing(Easing.Quintic.InOut)
        .onUpdate(() => {
          map?.moveCamera({tilt: cameraOptions.tilt, heading: cameraOptions.heading, zoom: cameraOptions.zoom, center:  {lat: cameraOptions.lat, lng: cameraOptions.lng}});
        }).start();


      function animate(time: number) {
        requestAnimationFrame(animate);
        update(time);
      }

      requestAnimationFrame(animate);
      }
    })(this.gps_service.map));
  }

}
