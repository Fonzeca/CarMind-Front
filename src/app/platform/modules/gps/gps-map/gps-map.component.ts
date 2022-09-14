import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { tap } from 'rxjs';
import { GpsPoint, GpsRouteData, RouteRequest, StopRoute, TravelRoute, VehiclesImeisRequest, VehicleState } from 'src/app/platform/interfaces/gps_data';
import { vehicle } from 'src/app/platform/interfaces/vehicle';
import { GpsService } from 'src/app/platform/services/gps.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';

@Component({
  selector: 'app-gps-map',
  templateUrl: './gps-map.component.html',
  styleUrls: ['./gps-map.component.scss'],
})
export class GpsMapComponent implements OnInit {

  constructor(public gps_service: GpsService) {

  }

  private map?: google.maps.Map;

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

        const routeRequest: RouteRequest = {
          imei: '867730050816697',
          from: '2022-09-01 00:00:00',
          to: '2022-09-05 04:42:00'
        };

      this.gps_service
        .getRouteByImei(routeRequest)
        .pipe(
          tap((route) => {

            for(var i = 0; i < route.length; i++) {
              if ('latitud' in route[i]){
                let stopRoute : StopRoute = route[i] as StopRoute;
  
                var polyLinePoints : google.maps.LatLng[] = [];

                if (i - 1 >= 0) {
                  var previousRoute = route[i - 1] as TravelRoute;
                  polyLinePoints.push(new google.maps.LatLng({lat: previousRoute.data[previousRoute.data.length-1].latitud, lng: previousRoute.data[previousRoute.data.length-1].longitud}));
                }
  
                polyLinePoints.push( new google.maps.LatLng({ lat: stopRoute.latitud, lng: stopRoute.longitud }));

                if (i + 1 < route.length) {
                  var nextRoute = route[i + 1] as TravelRoute;
                  polyLinePoints.push(new google.maps.LatLng({lat: nextRoute.data[0].latitud, lng: nextRoute.data[0].longitud}));
                }

                
                this.drawRouteMarker(stopRoute.latitud, stopRoute.longitud);

                this.drawRoutePolyline(polyLinePoints, 'black')
              }
              else{
                let travelRoute : TravelRoute = route[i] as TravelRoute;

                this.drawRouteMarker(travelRoute.data[0].latitud, travelRoute.data[0].longitud);

                this.drawRoutePolylines(travelRoute.data);
              }
            }
          })
        )
        .subscribe();
    });
  }

  drawRouteMarker(latitud:number, longitud:number){
    new google.maps.Marker({
      map: this.map,
      position: {
        lat: latitud,
        lng: longitud,
      },
    });
  }

  drawRoutePolyline(points : google.maps.LatLng[], colorLine : string){
    var polyLinePoints : google.maps.MVCArray<google.maps.LatLng> = new google.maps.MVCArray<google.maps.LatLng>(points);
    new google.maps.Polyline({
      path: polyLinePoints,
      map: this.map,
      strokeColor: colorLine,
      strokeWeight: 2,
    }); 
  }

  drawRoutePolylines(points : GpsPoint[]){
    if (points.length > 0) {
      var polyLinePoints : google.maps.LatLng[] = [];
      var speed : number = 0;
      var color : string = 'black';
      var previousColor : string = 'black';
      for (var i = 0; i < points.length; i++) {
        speed = points[i].speed;
        color = this.speedToColor(speed);

        polyLinePoints.push(new google.maps.LatLng({lat: points[i].latitud, lng: points[i].longitud}));

        if (i > 0 && (color != previousColor || i + 1 >= points.length)) {
          
          if (i + 1 >= points.length) {
            this.drawRoutePolyline(polyLinePoints, color);
          } else {
            this.drawRoutePolyline(polyLinePoints, previousColor);
          }

          polyLinePoints = [];
        }
        previousColor = color;
      }
    }
  }

  speedToColor(speed : number) {
    if (speed < 60) {
      return 'green';
    } else if (speed < 110) {
      return 'orange';
    }
    return 'red';
  }
}
