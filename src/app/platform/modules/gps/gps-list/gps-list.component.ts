import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Easing, Tween, update } from '@tweenjs/tween.js';
import { firstValueFrom, tap, interval, Observable, Subscription, timer} from 'rxjs';
import { Position, VehiclesImeisRequest, VehicleState } from 'src/app/platform/interfaces/gps_data';
import { vehicle } from 'src/app/platform/interfaces/vehicle';
import { GpsService } from 'src/app/platform/services/gps.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';


@Component({
  selector: 'app-gps-list',
  templateUrl: './gps-list.component.html',
  styleUrls: ['./gps-list.component.scss']
})
export class GpsListComponent extends BaseComponent implements OnInit {

  vehiclesStates!:VehicleState[];
  markers: { [imei: string] : google.maps.Marker; } = {};
  private drawVehcilePositionsEvery5Seconds :  Subscription | undefined;
  searchText = '';

  constructor(public router:Router, public gps_service: GpsService, public vehicle_service: VehiclesService) {
    super();

     this.getVehicles().then(([vehicles, vehiclesImeis]) => {
      
      const vehiclesImeisRequest: VehiclesImeisRequest = {
        imeis:  vehiclesImeis as string[],
      };


      this.drawVehcilePositionsEvery5Seconds = timer(0, 5000).subscribe(_ => {
        this.gps_service.getVehiclesStateByImeis(vehiclesImeisRequest).pipe(
          tap((response) => {
              
            this.vehiclesStates = (vehicles as vehicle[]).map((vehicle) => {
              var fullDetailedVehicle : VehicleState = response.find(v => v.imei == vehicle.imei)!;
              fullDetailedVehicle!.nombre = vehicle.nombre;
              fullDetailedVehicle!.patente = vehicle.patente;
              
              this.drawVehicleMarker(fullDetailedVehicle.latitud, fullDetailedVehicle.longitud, vehicle.imei)
    
              return fullDetailedVehicle;
            });     
  
            

          })
        ).subscribe();
      });
     });
    

  }
  
  async getVehicles() {
    var vehiclesResponse = await    firstValueFrom( this.vehicle_service.getAll())
    var vehicles: vehicle[] = vehiclesResponse.splice( vehiclesResponse.findIndex(v => v.imei !== undefined), 1)
    var vehiclesImeis: string[] = vehicles.map((vehicle) => vehicle.imei);
    return [vehicles, vehiclesImeis];
  }


  ngOnInit(): void {
  }

  override ngOnDestroy() {
    this.drawVehcilePositionsEvery5Seconds?.unsubscribe();
  }

  detail(vehicle: VehicleState){
    this.router.navigate([this.getAppRoutes.platform.gps.details.route], {state:{vehicle: vehicle}})
  }

  
  drawVehicleMarker(latitud:number, longitud:number, imei:string){

    var finalPosition = {
      lat: latitud,
      lng: longitud,
    }; 
    
    if(imei in this.markers){
      var currentPosition = {
        lat: this.markers[imei].getPosition()!.lat(),
        lng: this.markers[imei].getPosition()!.lng()
      }
      new Tween( currentPosition)
        .to({lat: latitud, lng: longitud}, 2000)
        .easing(Easing.Linear.None)
        .onUpdate(() => {
          this.markers[imei].setPosition({lat: currentPosition.lat, lng: currentPosition.lng});
      }).start();
    } 
    else {

      var marker :  google.maps.Marker = new google.maps.Marker({
        map: this.gps_service.map,
        position: finalPosition,
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
  
        }
      })(this.gps_service.map));

      this.markers[imei] = marker

      function animate(time: number) {
        requestAnimationFrame(animate);
        update(time);
      }

      requestAnimationFrame(animate);
    }
  }

}
