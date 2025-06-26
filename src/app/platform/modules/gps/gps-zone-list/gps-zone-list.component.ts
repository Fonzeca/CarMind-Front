import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Easing, Tween, update } from '@tweenjs/tween.js';
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
            
            this.gps_service.fetchZones(this.auth).then((zones) => {
              this.zones = zones;

              this.gps_service.setVisibilityOfZones(true);
            }).catch((error) => {
              console.error('Error fetching zones:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar las zonas.',
              });
            });
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
    this.router.navigate([this.getAppRoutes.platform.gps.zones.details.route], {state:{zoneId: zone.id, isCreatingZone: false}});
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
        this.gps_service.deleteZone(zone.id.toString()).subscribe(async ()=>{
          this.zones = await this.gps_service.fetchZones(this.auth);
        });
      }
    })
  }

  clearAllDrawZones(){
    this.zones.forEach(z => {
      z.zonePolygon?.setMap(null);
    });
  }

  hideZone(zoneId: number){
    var selectedZoneIndex : number = this.zones.findIndex(z => z.id === zoneId)!
    this.zones[selectedZoneIndex].isHidden = !this.zones[selectedZoneIndex].isHidden;
    if( this.zones[selectedZoneIndex].isHidden){
      this.zones[selectedZoneIndex].zonePolygon?.setMap(null);
    }else{
      this.zones[selectedZoneIndex].zonePolygon?.setMap(this.gps_service.map!);
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
