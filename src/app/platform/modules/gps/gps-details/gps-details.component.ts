import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';
import { GpsPoint, GpsRouteData, RouteRequest, StopRoute, TravelRoute, VehicleState } from 'src/app/platform/interfaces/gps_data';
import { Easing, Tween, update } from "@tweenjs/tween.js";
import { GpsService } from 'src/app/platform/services/gps.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-gps-details',
  templateUrl: './gps-details.component.html',
  styleUrls: ['./gps-details.component.scss']
})
export class GpsDetailsComponent extends BaseComponent implements OnInit {

  vehicle:VehicleState | undefined;
  dateFrom : string =  '';
  dateTo : string =  '';
  polylines: google.maps.Polyline[] = [];
  markers: google.maps.Marker[] = [];
  travelRoutes: GpsRouteData[] = [];
  totalKms : number = 0;
  totalStops: number = 0;

  constructor(private router: Router, public gps_service: GpsService,private ngbDateParserFormatter: NgbDateParserFormatter) {
    super();
    if(this.router.getCurrentNavigation() === null || this.router.getCurrentNavigation()!.extras.state! === undefined){
      this.router.navigateByUrl(this.getAppRoutes.platform.gps.route);
    }else{
      this.vehicle = this.router.getCurrentNavigation()!.extras.state!['vehicle'];
    }
  }

  ngOnInit(): void {
  }

  onDateFromSelect(dateFrom : NgbDate){
    let paredDate = this.ngbDateParserFormatter.format(dateFrom);
    this.dateFrom = paredDate + ' 00:00:00'
    this.getRoute();
   }

  onDateToSelect(dateTo : NgbDate){
    let paredDate = this.ngbDateParserFormatter.format(dateTo);
    this.dateTo = paredDate + ' 00:00:00'
    this.getRoute();
  }

  getRoute(){

    this.travelRoutes = [];
    this.totalKms = 0;
    this.totalStops = 0;

    this.clearRoute();

    if(this.dateFrom.length <= 0 || this.dateTo.length <= 0) return;

    const routeRequest: RouteRequest = {
      imei: this.vehicle!.imei,
      from: this.dateFrom,
      to: this.dateTo
    };

    this.gps_service
      .getRouteByImei(routeRequest)
      .pipe(
        tap((route) => {

          for(var i = 0; i < route.length; i++) {
            if ('latitud' in route[i]){
              let stopRoute : StopRoute = route[i] as StopRoute;
              
              this.totalStops += 1;

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

              stopRoute.duration =  this.getDuration(stopRoute.fromDate.toString(), stopRoute.toDate.toString(), stopRoute.fromHour.toString(), stopRoute.toHour.toString());

              this.travelRoutes.push(stopRoute);
              
              this.drawRouteMarker(stopRoute.latitud, stopRoute.longitud);

              this.drawRoutePolyline(polyLinePoints, 'black')
            }
            else{
              let travelRoute : TravelRoute = route[i] as TravelRoute;

              travelRoute.duration =  this.getDuration(travelRoute.fromDate.toString(), travelRoute.toDate.toString(), travelRoute.fromHour.toString(), travelRoute.toHour.toString());
              
              this.totalKms += travelRoute.km;
              
              this.travelRoutes.push(travelRoute);

              this.drawRouteMarker(travelRoute.data[0].latitud, travelRoute.data[0].longitud);

              this.drawRoutePolylines(travelRoute.data);
            }
          }

          this.moveCameraToRoute(this.markers.map(m => m.getPosition()!));
        })
    ).subscribe();

  }

  getDuration(fromDateString : string, toDateString : string, fromHourString : string, toHourString : string){
    let fromDate = new Date(fromDateString + " " + fromHourString);
    let toDate = new Date( toDateString + " "+ toHourString);
    let diffMs = (toDate.getTime() - fromDate.getTime());
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); 
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return  diffHrs.toString() + "hs " + diffMins.toString() + "min";
  }

  drawRouteMarker(latitud:number, longitud:number){
    var marker :  google.maps.Marker = new google.maps.Marker({
      map: this.gps_service.map,
      position: {
        lat: latitud,
        lng: longitud,
      },
    });
    this.markers.push(marker);
    google.maps.event.addListener(marker, 'click', this.moveCameraToMarker.bind(this, latitud, longitud));
  }

  drawRoutePolyline(points : google.maps.LatLng[], colorLine : string){
    var polyLinePoints : google.maps.MVCArray<google.maps.LatLng> = new google.maps.MVCArray<google.maps.LatLng>(points);
    this.polylines.push(new google.maps.Polyline({
      path: polyLinePoints,
      map: this.gps_service.map,
      strokeColor: colorLine,
      strokeWeight: 2,
    })); 
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

  moveCameraToRoute(positions : google.maps.LatLng[]){
    var bounds = new google.maps.LatLngBounds();

    positions.forEach(position => bounds.extend(position));
    this.gps_service.map!.fitBounds(bounds);
  }

  moveCamera(travelRoute : GpsRouteData){
    if ('latitud' in travelRoute){

      var latitud : number = (travelRoute as StopRoute).latitud;
      var longitud : number = (travelRoute as StopRoute).longitud;

      this.moveCameraToMarker(latitud, longitud);
    }else{

      var positions : GpsPoint[] = (travelRoute as TravelRoute).data;

      this.moveCameraToRoute(positions.map(p => new google.maps.LatLng(p.latitud, p.longitud)));
    }
  }

  moveCameraToMarker(latitud: number, longitud: number){
    var cameraOptions = {
      tilt: this.gps_service.map?.getTilt(),
      zoom: this.gps_service.map?.getZoom(),
      heading: this.gps_service.map?.getHeading(),
      lat:this.gps_service.map?.getCenter()!.lat()!,
      lng: this.gps_service.map?.getCenter()!.lng()!,
    }

    new Tween(cameraOptions)
    .to({lat: latitud, lng: longitud, zoom: 15, tilt: 0, heading: 0}, 3000)
    .easing(Easing.Quintic.InOut)
    .onUpdate(() => {
      this.gps_service.map?.moveCamera({tilt: cameraOptions.tilt, heading: cameraOptions.heading, zoom: cameraOptions.zoom, center:  {lat: cameraOptions.lat, lng: cameraOptions.lng}});
    }).start();


  function animate(time: number) {
    requestAnimationFrame(animate);
    update(time);
  }

  requestAnimationFrame(animate);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.clearRoute();
  }
  
  clearRoute(){
    this.markers.forEach(marker => marker.setMap(null));
    this.polylines.forEach(polyline => polyline.setMap(null));
    this.polylines = [];
    this.markers = [];
  }

}
