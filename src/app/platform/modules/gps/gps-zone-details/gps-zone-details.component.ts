import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { VehicleView } from 'src/app/platform/interfaces/gps_data';
import { vehicle } from 'src/app/platform/interfaces/vehicle';
import { GpsService } from 'src/app/platform/services/gps.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';


@Component({
  selector: 'app-zone-details',
  templateUrl: './gps-zone-details.component.html',
  styleUrls: ['./gps-zone-details.component.scss']
})
export class GpsZoneDetailsComponent extends BaseComponent implements OnInit {

  isAddingPoints: boolean = true;

  zone : google.maps.Polygon | undefined;
  zoneName: string | undefined;
  zoneStrokeColor : string = "#ff0000";
  zoneFillColor : string = "#ffa07a"
  zoneCoords : google.maps.LatLng[] = [];

  vehicles : VehicleView[] = []

  checked : boolean = false;
  color: ThemePalette = 'primary'

  markersToDrawZone : google.maps.Marker[] = []


  constructor(private router: Router, public gps_service: GpsService) {
    super();
    if (this.router.getCurrentNavigation() === null || this.router.getCurrentNavigation()!.extras.state! === undefined) {
      this.router.navigateByUrl(this.getAppRoutes.platform.gps.zones.route);
    } else {
      this.zoneName = this.router.getCurrentNavigation()!.extras.state!['zoneName'];
    }

    this.vehicles.push({nombre: "el 1", patente: "asd-as"})

    this.gps_service.map?.addListener('click', (mapsMouseEvent :any) =>{

     this.markersToDrawZone.push(new google.maps.Marker({
        position: mapsMouseEvent.latLng.toJSON(),
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 4,
          fillColor: "#FF0000",
          strokeColor: "#FF0000",
        },
        draggable: true,
        map: this.gps_service.map,
      }));

    })

  }

  ngOnInit(): void {
  }

  finishCreatingZone(){

    this.zoneCoords = this.markersToDrawZone.map(marker => marker.getPosition()!);
  
    this.zone = new google.maps.Polygon({
      paths: this.zoneCoords,
      strokeColor: this.zoneStrokeColor,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: this.zoneFillColor,
      fillOpacity: 0.35,
      editable: false
    });
  
    this.zone.setMap(this.gps_service.map!);
    this.zone.set
    
    this.markersToDrawZone.forEach(marker => marker.setMap(null));
    this.markersToDrawZone = [];

    this.isAddingPoints = false;

    google.maps.event.clearListeners(this.gps_service.map!, 'click');
  }

  onStrokeColorInputChanged(color : string){

    this.zone!.setMap(null);

      this.zone = new google.maps.Polygon({
        paths: this.zoneCoords,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: this.zoneFillColor,
        fillOpacity: 0.35,
        editable: false
      });

      this.zone.setMap(this.gps_service.map!);

      this.zoneStrokeColor = color;
  }

  onFillColorInputChanged(color : string){

    this.zone!.setMap(null);

      this.zone = new google.maps.Polygon({
        paths: this.zoneCoords,
        strokeColor: this.zoneStrokeColor,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35,
        editable: false
      });

      this.zone.setMap(this.gps_service.map!);

      this.zoneFillColor = color;
  }
}
