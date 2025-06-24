import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GpsService } from 'src/app/platform/services/gps.service';

@Component({
  selector: 'app-gps-map',
  templateUrl: './gps-map.component.html',
  styleUrls: ['./gps-map.component.scss'],
})
export class GpsMapComponent implements OnInit {

  title = 'google-maps';

  constructor(public gps_service: GpsService) {}


  ngOnInit(): void {
    let loader = new Loader({
      //TODO: NO MOSTRAR APIKEY
      apiKey: 'AIzaSyB_3WVXG9Z0a8mxS4Q8pEFjvjHpGmm9uEU',
    });
  
    loader.load().then((response) => {
      const location = {
        lat: -48.404479,
        lng: -69.651008,
      };
  
      this.gps_service.map = new google.maps.Map(document.getElementById('map')!, {
        center: location,
        zoom: 6,
        mapId: 'aa99da66fc3150b',
        minZoom: 5
      });

      
  
    }).then(_=>{
      this.gps_service.onMapCreated.emit(true);
    });
  }


}
