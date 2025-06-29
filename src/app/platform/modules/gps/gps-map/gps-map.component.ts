import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GpsService } from 'src/app/platform/services/gps.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gps-map',
  templateUrl: './gps-map.component.html',
  styleUrls: ['./gps-map.component.scss'],
})
export class GpsMapComponent implements OnInit {

  title = 'google-maps';

  constructor(public gps_service: GpsService) { }


  ngOnInit(): void {
    const loader = new Loader({
      apiKey: environment.mapsApiKey,
    });

    const mapOptions = {
      center: {
        lat: -48.404479,
        lng: -69.651008,
      },
      zoom: 6,
      mapId: 'aa99da66fc3150b',
      minZoom: 5,
      mapTypeId: 'satellite',

    } as google.maps.MapOptions;

    Promise.all([
      loader.importLibrary('maps'),
      loader.importLibrary('marker'),
    ])
      .then(([{ Map }, { AdvancedMarkerElement }]) => {
        this.gps_service.map = new Map(document.getElementById("map")!, mapOptions);
      })
      .catch((e) => {
        // do something
      })
      .then(() => {
        this.gps_service.onMapCreated.emit(true);
      });

  }


}
