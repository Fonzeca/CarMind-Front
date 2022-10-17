import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Easing, Tween, update } from '@tweenjs/tween.js';
import { firstValueFrom } from 'rxjs';
import { ZoneView } from 'src/app/platform/interfaces/gps_data';
import { AuthService } from 'src/app/platform/services/auth.service';
import { GpsService } from 'src/app/platform/services/gps.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zone',
  templateUrl: './gps-zone-list.component.html',
  styleUrls: ['./gps-zone-list.component.scss']
})
export class GpsZoneComponent extends BaseComponent implements OnInit {

  zonesDraw : google.maps.Polygon[] = [];
  zones: ZoneView[] = [];
  searchText = '';
  itemSelected : number | null = null;

  editing_id = '';
  @ViewChild('editing') input!: ElementRef;

  reloadZones : any;

  constructor(public router:Router, public gps_service: GpsService, public auth: AuthService) {
    super();

    //Cada vez que se agrega una zona, se actualiza o se elimina, una se llama a la api de obtener zonas de nuevo.
    this.reloadZones = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          if(event.url === "/platform/gps/zones") {
              this.getZones();
          }
      }
  });
  }

  ngOnInit(): void {
  }

  override ngOnDestroy(): void {
    this.clearAllDrawZones();
    this.reloadZones.unsubscribe();
  }

  async getZones(){
    var response : any;
    if (this.auth.user === undefined || Object.keys(this.auth.user).length === 0){
      const user = await firstValueFrom(this.auth.getLoggedUser());
      response = await firstValueFrom(this.gps_service.getZonesByEmpresaId(user.empresa));
    }else{
      response = await firstValueFrom(this.gps_service.getZonesByEmpresaId(this.auth.user.empresa));
    }
    this.zones = response
    this.zones.forEach(z => z.isHidden = false);
    this.drawAllZones();

  }

  drawAllZones() {
    this.zones.forEach(z => {
      //Proceso para pasar los puntos de un string a el objeto de tipo LatLng necesario para dibujar la zona posteriormente
      var splittedPoints : string[] = z.puntos.split('; ')
      var path =  splittedPoints.map((point : any) => {
        var splittedPoint : string[] = point.split(',');
        return new google.maps.LatLng(+splittedPoint[0], +splittedPoint[1]);
      }) 

      var newZoneDraw = new google.maps.Polygon({
        paths: path,
        strokeColor: z.color_linea,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: z.color_relleno,
        fillOpacity: 0.35,
        editable: false
      });
      newZoneDraw.setMap(this.gps_service.map!);

      this.zonesDraw.push(newZoneDraw);
    });
  }

  addZone(id: string) {
    this.editing_id = id;
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 0);
  }

  saveNewZone(input: any) {
    const property = this.editing_id;
    const value = input.value;
    let data: any = {};
    data[property] = value;
    this.editing_id = '';
    if(data[property].length <= 0) return;
    this.router.navigate([this.getAppRoutes.platform.gps.zones.details.route], {state:{zoneName: data['zoneName'], isCreatingZone: true}});
  }

  editZone(zone : ZoneView){
    this.router.navigate([this.getAppRoutes.platform.gps.zones.details.route], {state:{zone: zone, isCreatingZone: false}});
  }

  deleteZone(zone : ZoneView){
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar la zona ${zone.nombre}?`,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: "btn btn-success m-btn-succes",
        cancelButton: 'order-1 right-gap',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.clearAllDrawZones();
        this.gps_service.deleteZone(zone.id.toString()).subscribe(()=>this.getZones());
      }
    })
  }

  clearAllDrawZones(){
    this.zonesDraw.forEach(z => {
      z.setMap(null);
    });
    this.zonesDraw = [];
  }

  hideZone(zoneId: number){
    var selectedZoneIndex : number = this.zones.findIndex(z => z.id === zoneId)!
    this.zones[selectedZoneIndex].isHidden = !this.zones[selectedZoneIndex].isHidden;
    if( this.zones[selectedZoneIndex].isHidden){
      this.zonesDraw[selectedZoneIndex].setMap(null);
    }else{
      this.zonesDraw[selectedZoneIndex].setMap(this.gps_service.map!);
    }
  }

  selectZone(id : number){
    this.itemSelected = id;
  }

  moveCameraToZone(zone : ZoneView){
    var bounds = new google.maps.LatLngBounds();
    
    var splittedPoints : string[] = zone.puntos.split('; ')
    splittedPoints.map((point : any) => {
      var splittedPoint : string[] = point.split(',');
      bounds.extend( new google.maps.LatLng(+splittedPoint[0], +splittedPoint[1]));
    }) 

    var cameraOptions = {
      tilt: this.gps_service.map?.getTilt(),
      zoom: this.gps_service.map?.getZoom(),
      heading: this.gps_service.map?.getHeading(),
      lat:this.gps_service.map?.getCenter()!.lat()!,
      lng: this.gps_service.map?.getCenter()!.lng()!,
    }

    new Tween(cameraOptions)
    .to({lat: bounds.getCenter().lat(), lng: bounds.getCenter().lng(), zoom: this.getZoomByBounds(bounds), tilt: 0, heading: 0}, 3000)
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

  getZoomByBounds( bounds :  google.maps.LatLngBounds){
    var MAX_ZOOM = this.gps_service.map!.mapTypes.get( this.gps_service.map!.getMapTypeId()! ).maxZoom || 21 ;
    var MIN_ZOOM = this.gps_service.map!.mapTypes.get( this.gps_service.map!.getMapTypeId()! ).minZoom || 0 ;
  
    var ne= this.gps_service.map!.getProjection()!.fromLatLngToPoint( bounds.getNorthEast() )!;
    var sw= this.gps_service.map!.getProjection()!.fromLatLngToPoint( bounds.getSouthWest() )!; 
  
    var worldCoordWidth = Math.abs(ne.x-sw.x);
    var worldCoordHeight = Math.abs(ne.y-sw.y);
  
    var FIT_PAD = 40;
  
    for( var zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom ){ 
        if( worldCoordWidth*(1<<zoom)+2*FIT_PAD < this.gps_service.map!.getDiv().offsetWidth && 
            worldCoordHeight*(1<<zoom)+2*FIT_PAD < this.gps_service.map!.getDiv().offsetHeight )
            return zoom;
    }
    return 0;
  }
}
