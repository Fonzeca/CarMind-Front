import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { tap } from 'rxjs';
import { GpsService } from 'src/app/platform/services/gps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(public gps_service: GpsService) { }

  private map?: google.maps.Map;

  title = "google-maps";
  

  ngOnInit(): void {
    let loader = new Loader({
      //TODO: NO MOSTRAR APIKEY
      apiKey: 'AIzaSyBvE0e-a4U25CU6LjBSsH1uJ-QgolcJkQ4',
    });

    loader.load().then((response) => {
      const location = {
        lat: -48.404479,
        lng: -69.651008
      }


      this.map = new google.maps.Map(document.getElementById('map')!, {
        center: location,
        zoom: 6,
        mapId: "aa99da66fc3150b"
      });

      this.gps_service.getLastLogByIMEI("867730050816697").pipe(
        tap((response) => {
          new google.maps.Marker({
            map: this.map,
            position: {
              lat: response.latitud,
              lng: response.longitud
            },
          });
        })
      ).subscribe();

      this.gps_service.getRoute("867730050816697").pipe(
        tap((response) =>{
          let ploygonArray = response.data.map(x => {
            return {
              lat: x.latitud,
              lng: x.longitud
            }
          })
          console.log(ploygonArray)

          new google.maps.Polyline({
            path: ploygonArray,
            map: this.map,
          });
        })
      ).subscribe();

    });
    
  }

}
