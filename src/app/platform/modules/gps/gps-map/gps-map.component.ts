import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { tap } from 'rxjs';
import { GpsPoint } from 'src/app/platform/interfaces/gps_data';
import { GpsService } from 'src/app/platform/services/gps.service';

@Component({
  selector: 'app-gps-map',
  templateUrl: './gps-map.component.html',
  styleUrls: ['./gps-map.component.scss'],
})
export class GpsMapComponent implements OnInit {
  constructor(public gps_service: GpsService) {}

  private map?: google.maps.Map;

  title = 'google-maps';

  ngOnInit(): void {
    let loader = new Loader({
      //TODO: NO MOSTRAR APIKEY
      apiKey: 'AIzaSyD7FklGNnN7EcMuGtSz4WpRNRXIsOSmxDU',
    });

    loader.load().then((response) => {
      const location = {
        lat: -48.404479,
        lng: -69.651008,
      };

      this.map = new google.maps.Map(document.getElementById('map')!, {
        center: location,
        zoom: 6,
        mapId: 'aa99da66fc3150b',
      });

      this.gps_service
        .getLastLogByIMEI('867730050816697')
        .pipe(
          tap((response) => {
            new google.maps.Marker({
              map: this.map,
              position: {
                lat: response.latitud,
                lng: response.longitud,
              },
            });
          })
        )
        .subscribe();

      this.gps_service
        .getRoute('867730050816697')
        .pipe(
          tap((response) => {
            let lastPoint: GpsPoint;
            response.data.forEach((data) => {
              if (lastPoint == null) {
                lastPoint = data;
                return;
              }

              let colorLine = 'black';
              if (data.speed > 40) {
                colorLine = 'red';
              }
              if (data.speed < 10) {
                colorLine = 'green';
              }

              new google.maps.Polyline({
                path: [
                  { lat: lastPoint.latitud, lng: lastPoint.longitud },
                  { lat: data.latitud, lng: data.longitud },
                ],
                map: this.map,
                strokeColor: colorLine,
                strokeWeight: 2,
              });

              lastPoint = data;
              new google.maps.TrafficLayer({ map: this.map });
            });

            // let ploygonArray = response.data.map(x => {
            //   return {
            //     lat: x.latitud,
            //     lng: x.longitud
            //   }
            // })
            // console.log(ploygonArray)

            // new google.maps.Polyline({
            //   path: ploygonArray,
            //   map: this.map,
            // });
          })
        )
        .subscribe();
    });
  }
}
