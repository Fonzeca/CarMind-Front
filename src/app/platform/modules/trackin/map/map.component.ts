import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  private map?: google.maps.Map;

  title = "google-maps";
  

  ngOnInit(): void {
    let loader = new Loader({
      //TODO: NO MOSTRAR APIKEY
      apiKey: '',
    });

    loader.load().then((response) => {
      console.log(response);

      const location = {
        lat: -48.404479,
        lng: -69.651008
      }


      this.map = new google.maps.Map(document.getElementById('map')!, {
        center: location,
        zoom: 6,
        mapId: "aa99da66fc3150b"
      });
    });
    
  }

}
