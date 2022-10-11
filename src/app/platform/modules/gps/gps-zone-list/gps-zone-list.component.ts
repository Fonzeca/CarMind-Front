import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  itemSelected = -1;

  editing_id = '';
  @ViewChild('editing') input!: ElementRef;

  reloadZones : any;

  constructor(public router:Router, public gps_service: GpsService, public auth: AuthService) {
    super();

    this.getZones();

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
    if (this.auth.user === undefined || Object.keys(this.auth.user).length === 0){
      this.auth.getLoggedUser().subscribe(user => {
        this.gps_service.getZonesByEmpresaId(user.empresa).subscribe(response => {
          this.zones = response
          this.drawAllZones();
        });
      })
    }else{
      this.gps_service.getZonesByEmpresaId(this.auth.user.empresa).subscribe(response => {
        this.zones = response
        this.drawAllZones();
      });
    }
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

}
