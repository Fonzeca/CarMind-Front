import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Easing, Tween, update } from "@tweenjs/tween.js";
import { tap } from 'rxjs';
import { GpsPoint, GpsRouteData, RouteRequest, StopRoute, TravelRoute, VehicleState } from 'src/app/platform/interfaces/gps_data';
import { GpsService } from 'src/app/platform/services/gps.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';
import { GeoOperationsService } from '../util/geo-operations.service';

@Component({
  selector: 'app-gps-details',
  templateUrl: './gps-vehicle-details.component.html',
  styleUrls: ['./gps-vehicle-details.component.scss']
})
export class GpsVehicleDetailsComponent extends BaseComponent implements OnInit {

  rastreadorButton = document.getElementById('rastreadorIcon');

  isAnimate : boolean = false;
  itemSelected : number | null = null;

  vehicle: VehicleState | undefined;
  dateFrom: string = '';
  dateTo: string = '';
  polylines: google.maps.Polyline[] = [];
  markers: google.maps.Marker[] = [];

  // directionalMarkers: google.maps.Marker[] = [];
  carMarker : google.maps.Marker | null = null;
  startTrip : google.maps.Marker | null = null;
  endTrip : google.maps.Marker | null = null;

  readonly carIcon : google.maps.Symbol;
  readonly stopIcon : google.maps.Icon;
  readonly stopRedIcon : google.maps.Icon;
  readonly startTripIcon : google.maps.Icon;
  readonly endTripIcon : google.maps.Icon;


  travelRoutes: GpsRouteData[] = [];
  totalKms: number = 0;
  totalStops: number = 0;

  constructor(private router: Router, public gps_service: GpsService, private ngbDateParserFormatter: NgbDateParserFormatter, private geo_operations: GeoOperationsService) {
    super();
    if (this.router.getCurrentNavigation() === null || this.router.getCurrentNavigation()!.extras.state! === undefined) {
      this.router.navigateByUrl(this.getAppRoutes.platform.gps.vehicles.route);
    } else {
      this.vehicle = this.router.getCurrentNavigation()!.extras.state!['vehicle'];
    }
    this.carIcon = {
      path: "M 687.792 587.663 L 351.644 0 L 0 587.663 L 7.3507 597 L 342.306 518.724 L 680.441 597 L 687.792 587.663 Z M 75.4941 537.002 L 349.657 70.7261 L 342.704 474.421 L 75.4941 537.002 Z",
      scale: .05,
      fillColor: "#000853",
      fillOpacity: 1,
      strokeWeight: 1,
      anchor : new google.maps.Point(346,259),
      rotation: 0
    };

    this.stopIcon = {
      scaledSize: new google.maps.Size(20,20),
      url: "assets/gps/stop.svg"
    }
    this.stopRedIcon = {
      scaledSize: new google.maps.Size(30,30),
      url: "assets/gps/stop-red.svg"
    }
    this.startTripIcon = {
      scaledSize: new google.maps.Size(50,50),
      url: "assets/gps/start.svg"
    }
    this.endTripIcon = {
      scaledSize: new google.maps.Size(50,50),
      url: "assets/gps/end.svg"
    }

  }


  //Esto es necesario para que cuando se haga click en el botón del menú Rastreador (botón que se encuentra fuera de este componente, se borre la ruta)
  navButtonHandler: any;

  ngOnInit() {
    this.clearRoute();
      this.navButtonHandler = this.clearRoute.bind(this);
      this.rastreadorButton?.addEventListener("click", this.navButtonHandler, true);
  }

  override ngOnDestroy(): void {
    this.rastreadorButton?.removeEventListener('click',   this.navButtonHandler )
    this.gps_service.isInDetails = false;
  }

  onDateFromSelect(dateFrom: NgbDate) {
    let paredDate = this.ngbDateParserFormatter.format(dateFrom);
    this.dateFrom = paredDate + ' 00:00:00'
    this.getRoute();
  }

  onDateToSelect(dateTo: NgbDate) {
    let paredDate = this.ngbDateParserFormatter.format(dateTo);
    this.dateTo = paredDate + ' 00:00:00'
    this.getRoute();
  }

  getRoute() {

    this.travelRoutes = [];
    this.totalKms = 0;
    this.totalStops = 0;
    
    this.clearRoute();
    
    if (this.dateFrom.length <= 0 || this.dateTo.length <= 0) return;
    
    for (const [imei, marker] of Object.entries(this.gps_service.markers)) { 
      marker.setMap(null);
      delete this.gps_service.markers[imei]
    }

    const routeRequest: RouteRequest = {
      imei: this.vehicle!.imei,
      from: this.dateFrom,
      to: this.dateTo
    };

    this.gps_service
      .getRouteByImei(routeRequest)
      .pipe(
        tap((route) => {
          
          if(route.length <= 0) return;

          for (var i = 0; i < route.length; i++) {
            if ('latitud' in route[i]) {
              let stopRoute: StopRoute = route[i] as StopRoute;

              this.totalStops += 1;

              var polyLinePoints: google.maps.LatLng[] = [];

              //Enlazo el ultimo punto de la ruta anterior
              if (i >= 1) {
                var previousRoute = route[i - 1] as TravelRoute;
                polyLinePoints.push(new google.maps.LatLng({ lat: previousRoute.data[previousRoute.data.length - 1].latitud, lng: previousRoute.data[previousRoute.data.length - 1].longitud }));
              }

              //Seteo el punto de parada
              polyLinePoints.push(new google.maps.LatLng({ lat: stopRoute.latitud, lng: stopRoute.longitud }));

              //Enlazo el primer punto del viaje siguiente
              if (i + 1 < route.length) {
                var nextRoute = route[i + 1] as TravelRoute;
                polyLinePoints.push(new google.maps.LatLng({ lat: nextRoute.data[0].latitud, lng: nextRoute.data[0].longitud }));
              }

              //Obtengo la cantidad de tiempo que se quedo en la parada y la seteo en la parada
              stopRoute.duration = this.getDuration(stopRoute.fromDate.toString(), stopRoute.toDate.toString(), stopRoute.fromHour.toString(), stopRoute.toHour.toString());

              //Agrego la parada para que se renderice en la lista
              this.travelRoutes.push(stopRoute);

              if(i != 0){
                //Dibujo una marca para que se sepa que es una parada
                this.drawRouteMarker(stopRoute.latitud, stopRoute.longitud, this.stopIcon, stopRoute);
              }

              //Dibujo las lineas correspondientes a la parada
              this.drawRoutePolyline(polyLinePoints, 'green', -1)
            }
            else {
              let travelRoute: TravelRoute = route[i] as TravelRoute;

              //Obtenemos la duracion del viaje y la seteo en el objeto viaje
              travelRoute.duration = this.getDuration(travelRoute.fromDate.toString(), travelRoute.toDate.toString(), travelRoute.fromHour.toString(), travelRoute.toHour.toString());

              //Acumulador de total de kilometros recorridos
              this.totalKms += travelRoute.km;

              //Agrego el viaje para que se renderice en la lista
              this.travelRoutes.push(travelRoute);


              // this.drawRouteMarker(travelRoute.data[0].latitud, travelRoute.data[0].longitud);

              this.drawRoutePolylines(travelRoute.data, travelRoute.id);
            }
          }
          
          //Centra la camara a todo la ruta
          var points :google.maps.LatLng[] = []
          this.polylines.forEach((line) =>{
            line.getPath().getArray().forEach((point)=>{points.push(point)})
          })
          this.moveCameraToRoute(points);

          //Se dibuja las banderas de inicio y fin
          this.drawStartAndEndOfTrip()

          this.gps_service.map?.addListener('dragstart', () => {
            this.itemSelected = null;
            this.polylines.forEach((item) => {
              item.setOptions({strokeOpacity: 1});
            })

            this.markers.forEach(marker =>{
              if(marker === this.startTrip || marker === this.startTrip) return;
               
              marker.setIcon(this.stopIcon);
            });
          })
        })
      ).subscribe();

    this.gps_service.map?.addListener("zoom_changed", ()=>{
      var weight = this.gps_service.map?.getZoom()! > 15 ? 5: 3;

      this.polylines.forEach((item) =>{
        item.setOptions({strokeWeight: weight})
      });
    });
  }

  getDuration(fromDateString: string, toDateString: string, fromHourString: string, toHourString: string) {
    let fromDate = new Date(fromDateString + " " + fromHourString);
    let toDate = new Date(toDateString + " " + toHourString);
    let diffMs = (toDate.getTime() - fromDate.getTime());
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return diffHrs.toString() + "hs " + diffMins.toString() + "min";
  }

  drawRouteMarker(latitud: number, longitud: number, icon : google.maps.Icon | null, stopLog : GpsRouteData | null = null) {

    var marker: google.maps.Marker = new google.maps.Marker({
      map: this.gps_service.map,
      position: {
        lat: latitud,
        lng: longitud,
      },
    });
    if(icon != null) marker.setIcon(icon);
    this.markers.push(marker);

    marker.addListener('click', ()=>{
      if(stopLog != null) this.selectTravelOrStop(stopLog)
    })
  }

  // setDirectionOfPath(points: google.maps.LatLng[]) {
  //   points.forEach((point, i) => {
  //     if (i == 0) return;
  //     if (i == points.length) return;

  //     var p1 = points[i - 1];
  //     var p2 = point;

  //     var lat_medio = (p1.lat() + p2.lat()) / 2;
  //     var lng_medio = (p1.lng() + p2.lng()) / 2;
  //     var puntoMedio = new google.maps.LatLng({ lat: lat_medio, lng: lng_medio });
  //     var radianDegrees = Math.atan2(p2.lng() - p1.lng(), p2.lat() - p1.lat());
  //     var degrees = radianDegrees * 180 / Math.PI;
  //     // icon.rotation = degrees;


  //     var marker: google.maps.Marker = new google.maps.Marker({
  //       position: puntoMedio,
  //     });
  //     marker.setIcon(this.icon);
  //     (marker.getIcon() as google.maps.Symbol).rotation = degrees;
  //     this.directionalMarkers.push(marker);
  //   });
  // }

  // drawDirectionalMarkers() {
  //   if (this.gps_service.map === undefined) return;
  //   var map = this.gps_service.map;

  //   if (map.getZoom()! > 15) {
  //     this.directionalMarkers.forEach((value) => {
  //       if (value.getMap() == null) {
  //         if (map!.getBounds()?.contains(value.getPosition()!)) {
  //           value.setMap(map!);
  //         } else {
  //           value.setMap(null);
  //         }
  //       }
  //     });
  //   } else {
  //     this.directionalMarkers.forEach((value) => {
  //       value.setMap(null);
  //     });
  //   }
  // }


  drawRoutePolyline(points: google.maps.LatLng[], colorLine: string, id:number) {
    // this.setDirectionOfPath(points);
    var polyLinePoints: google.maps.MVCArray<google.maps.LatLng> = new google.maps.MVCArray<google.maps.LatLng>(points);
    var singlePolyline = new google.maps.Polyline({
      path: polyLinePoints,
      map: this.gps_service.map,
      strokeColor: colorLine,
      strokeWeight: 3,
    });
    singlePolyline.set("id", id);
    singlePolyline.set("originalColor", colorLine);
    singlePolyline.addListener("mouseover", (event : google.maps.PolyMouseEvent)=>{
      this.drawCar(event.latLng!, points)
    })
    singlePolyline.addListener("mousemove", (event : google.maps.PolyMouseEvent)=>{
      this.drawCar(event.latLng!, points)
    })
    singlePolyline.addListener("mouseout", (event : google.maps.PolyMouseEvent)=>{
      this.clearCarMarker();
    })
    this.polylines.push(singlePolyline);
  }

  drawRoutePolylines(points: GpsPoint[], id: number) {
    if (points.length > 0) {
      var polyLinePoints: google.maps.LatLng[] = [];
      var speed: number = 0;
      var color: string = 'black';
      var previousColor: string = 'black';
      var previousLat = 0;
      var previousLng = 0;
      for (var i = 0; i < points.length; i++) {
        if (previousLat == points[i].latitud && previousLng == points[i].longitud) continue;

        speed = points[i].speed;
        color = this.speedToColor(speed);


        polyLinePoints.push(new google.maps.LatLng({ lat: points[i].latitud, lng: points[i].longitud }));

        if (polyLinePoints.length >= 2 || color != previousColor || i + 1 == points.length) {

          if (i + 1 == points.length) {
            this.drawRoutePolyline(polyLinePoints, color, id);
          } else {
            this.drawRoutePolyline(polyLinePoints, previousColor, id);
          }

          polyLinePoints = [];
          polyLinePoints.push(new google.maps.LatLng({ lat: points[i].latitud, lng: points[i].longitud }));
        }
        previousColor = color;
        previousLat = points[i].latitud;
        previousLng = points[i].longitud;
      }
    }
  }

  drawStartAndEndOfTrip(){
    var startPosition : google.maps.LatLng | null = null;
    var endPosition : google.maps.LatLng | null = null;
    if(this.startTrip != null){
      this.startTrip.setMap(null)
      this.startTrip = null
    }
    if(this.endTrip != null){
      this.endTrip.setMap(null)
      this.endTrip = null
    }

    if(this.polylines.length >= 2){
      var length = this.polylines.length;
      startPosition = this.polylines[0].getPath().getAt(0);
        
      var lengthOfLast = this.polylines[length-1].getPath().getLength();
      endPosition = this.polylines[length-1].getPath().getAt(lengthOfLast-1);    
    }
    
    if(startPosition != null && endPosition != null){
      var startmarker: google.maps.Marker = new google.maps.Marker({
        map: this.gps_service.map,
        position: {
          lat: startPosition.lat(),
          lng: startPosition.lng(),
        },
      });
      startmarker.setIcon(this.startTripIcon);
      this.startTrip = startmarker;

      var endMarker: google.maps.Marker = new google.maps.Marker({
        map: this.gps_service.map,
        position: {
          lat: endPosition.lat(),
          lng: endPosition.lng(),
        },
      });
      endMarker.setIcon(this.endTripIcon);
      this.endTrip = endMarker;
    }


  }

  speedToColor(speed: number) {
    if (speed < 60) {
      return 'green';
    } else if (speed < 110) {
      return 'orange';
    }
    return 'red';
  }

  drawCar(point: google.maps.LatLng, path : google.maps.LatLng[]) {
    var deg : number = 0;
    deg = this.geo_operations.degreesOfTwoPoints(path[0], path[1])

    if(this.carMarker == null){
      var marker: google.maps.Marker = new google.maps.Marker({
        map: this.gps_service.map,
        position: point,
      });
      
      marker.setIcon(this.carIcon);
      this.carMarker = marker;

    }else{
      (this.carMarker.getIcon() as google.maps.Symbol).rotation = deg;
      this.carMarker.setPosition(point);
    }
  }


  moveCameraToRoute(positions : google.maps.LatLng[]){
    var bounds = new google.maps.LatLngBounds();

    positions.forEach(position => bounds.extend(position));
    this.gps_service.map!.fitBounds(bounds);
  }

  selectTravelOrStop(travelOrStopRoute : GpsRouteData){

    
    this.itemSelected = travelOrStopRoute.id;
    // this.mylist.find((item)=>{
      //   if(item.nativeElement.id == travelRoute.id){
        //     item.nativeElement.scrollIntoView();
        //   }
        //   return false
        // })
        if((<TravelRoute>travelOrStopRoute).data !== undefined){
          this.resaltarRuta(travelOrStopRoute as TravelRoute);
          this.moveCamera(travelOrStopRoute as TravelRoute);
        }else{
          var stopRoute : StopRoute = travelOrStopRoute as StopRoute;
          this.moveCamera(travelOrStopRoute);

          this.markers.forEach(marker =>{
            if(marker === this.startTrip || marker === this.startTrip) return;

            if(marker.getPosition()!.lat() == stopRoute.latitud && marker.getPosition()!.lng() == stopRoute.longitud){
              marker.setIcon(this.stopRedIcon);
            }else{
              marker.setIcon(this.stopIcon);
            }
          });
    }
  }
  

  resaltarRuta(travelRoute : TravelRoute){
    this.polylines.forEach((item) => {
      item.setOptions({strokeOpacity : 1})
      if(item.get("id") == travelRoute.id){
      }else{
        item.setOptions({strokeOpacity : 0.3})
      }
    })
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
    .to({lat: latitud, lng: longitud, zoom: 15, tilt: 0, heading: 0}, 2000)
    .easing(Easing.Quintic.InOut)
    .onStart(()=>{
      this.isAnimate = true;
    })
    .onUpdate(() => {
      this.gps_service.map?.moveCamera({tilt: cameraOptions.tilt, heading: cameraOptions.heading, zoom: cameraOptions.zoom, center:  {lat: cameraOptions.lat, lng: cameraOptions.lng}});
    })
    .onComplete(() => {
      this.isAnimate = false;
    })
    .start();


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

  clearCarMarker(){
    if(this.carMarker != null){
      this.carMarker.setMap(null);
      this.carMarker = null;
    }
  }

  clearRoute() {
    this.clearCarMarker();
    this.markers.forEach(marker => marker.setMap(null));
    this.polylines.forEach(polyline => polyline.setMap(null));
    // this.directionalMarkers.forEach(marker => marker.setMap(null));
    // this.directionalMarkers = [];
    if(this.endTrip != null){
      this.endTrip.setMap(null)
      this.endTrip = null;
    }
    if(this.startTrip != null){
      this.startTrip.setMap(null)
      this.startTrip = null;
    }
    this.polylines = [];
    this.markers = [];
  }

}
