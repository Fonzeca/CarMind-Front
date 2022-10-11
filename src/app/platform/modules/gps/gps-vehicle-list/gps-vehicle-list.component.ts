import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Easing, Tween, update } from '@tweenjs/tween.js';
import { firstValueFrom, Subscription, tap, timer } from 'rxjs';
import { VehiclesImeisRequest, VehicleState } from 'src/app/platform/interfaces/gps_data';
import { vehicle } from 'src/app/platform/interfaces/vehicle';
import { GpsService } from 'src/app/platform/services/gps.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './gps-vehicle-list.component.html',
  styleUrls: ['./gps-vehicle-list.component.scss']
})
export class GpsVehicleListComponent extends BaseComponent implements OnInit {

  markers: { [imei: string] : google.maps.Marker; } = {};

  vehiclesStates!:VehicleState[];
  private drawVehcilePositionsEvery5Seconds :  Subscription | undefined;

  itemSelected : string | null = null;
  searchText = '';

  constructor(public router:Router, public gps_service: GpsService, public vehicle_service: VehiclesService) {
    super();
  
    this.getVehicles().then(([vehicles, vehiclesImeis]) => {
      
      const vehiclesImeisRequest: VehiclesImeisRequest = {
        imeis:  vehiclesImeis as string[],
      };

      this.drawVehcilePositionsEvery5Seconds = timer(0, 3000).subscribe(_ => {
        this.gps_service.getVehiclesStateByImeis(vehiclesImeisRequest).pipe(
          tap((response) => {
              
            this.vehiclesStates = [];
            (vehicles as vehicle[]).forEach((vehicle) => {
              var fullDetailedVehicle : VehicleState = response.find(v => v.imei == vehicle.imei)!;

              if (fullDetailedVehicle){
                fullDetailedVehicle!.nombre = vehicle.nombre;
                fullDetailedVehicle!.patente = vehicle.patente;
                
                this.drawVehicleMarker(fullDetailedVehicle.latitud, fullDetailedVehicle.longitud, vehicle.imei)

                this.vehiclesStates.push(fullDetailedVehicle);
              }
            });    
            
          })
        ).subscribe();
      });

     });
  }

  async getVehicles() {
    var vehiclesResponse = await    firstValueFrom( this.vehicle_service.getAll())
    var vehicles = vehiclesResponse.filter(v=> v.imei !== undefined);
    var vehiclesImeis: string[] = vehicles.map((vehicle) => vehicle.imei);
    return [vehicles, vehiclesImeis];
  }

  ngOnInit(): void {
    this.gps_service.map?.addListener('dragstart', () => {
      this.itemSelected = null;
    })
  }

  override ngOnDestroy(): void {
    this.gps_service.map?.unbind('dragstart');
    this.drawVehcilePositionsEvery5Seconds?.unsubscribe();
    for (const [_, marker] of Object.entries(this.markers)) { 
        marker.setMap(null);
    }
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
          if(this.markers[imei] !== undefined) this.markers[imei].setPosition({lat: currentPosition.lat, lng: currentPosition.lng});
      }).start();
    } 
    else {

      if(this.gps_service.isInDetails) return;

      (async() => {
        while(this.gps_service.map === undefined)
            await new Promise(resolve => setTimeout(resolve, 1000));

        var marker :  google.maps.Marker = new google.maps.Marker({
          map: this.gps_service.map,
          position: finalPosition,
        });
    
        google.maps.event.addListener(marker, 'click', this.moveCameraToVehicle.bind(this, latitud, longitud));
    
        this.markers[imei] = marker
    

    })();
      
    }
  }


  detail(vehicle: VehicleState){
    this.gps_service.isInDetails = true;
    for (const [imei, marker] of Object.entries(this.markers)) { 
      if(imei !== vehicle.imei){
        marker.setMap(null);
        delete this.markers[imei]
      }
    }
    this.router.navigate([this.getAppRoutes.platform.gps.vehicles.details.route], {state:{vehicle: vehicle}})
  }

  
  selectVehicle(imei : string){
    this.itemSelected = imei;
  }

  moveCameraToVehicle(latitud: number, longitud:number){
    var cameraOptions = {
      tilt: this.gps_service.map?.getTilt(),
      zoom: this.gps_service.map?.getZoom(),
      heading: this.gps_service.map?.getHeading(),
      lat:this.gps_service.map?.getCenter()!.lat()!,
      lng: this.gps_service.map?.getCenter()!.lng()!,
    }

    new Tween(cameraOptions)
    .to({lat: latitud, lng: longitud, zoom: 17, tilt: 0, heading: 0}, 3000)
    .easing(Easing.Quintic.InOut)
    .onComplete(()=>{
      this.drawVehcilePositionsEvery5Seconds?.add()
    })
    .onUpdate(() => {
      this.gps_service.map?.moveCamera({tilt: cameraOptions.tilt, heading: cameraOptions.heading, zoom: cameraOptions.zoom, center:  {lat: cameraOptions.lat, lng: cameraOptions.lng}});
    }).start();

    function animate(time: number) {
      requestAnimationFrame(animate);
      update(time);
    }

    requestAnimationFrame(animate);
}

}
