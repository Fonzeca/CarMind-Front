import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { tap } from 'rxjs';
import { GpsService } from 'src/app/platform/services/gps.service';

@Component({
  selector: 'app-gps-map',
  templateUrl: './gps-map.component.html',
  styleUrls: ['./gps-map.component.scss'],
})
export class GpsMapComponent implements OnInit {

  constructor(public gps_service: GpsService) {

  }

  title = 'google-maps';

  ngOnInit(): void {
    let loader = new Loader({
      //TODO: NO MOSTRAR APIKEY
      apiKey: 'AIzaSyBksBzP29Z651LUCwmF0U7bSp7U6Z9IIuI',
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
      });

    });
  }

}
