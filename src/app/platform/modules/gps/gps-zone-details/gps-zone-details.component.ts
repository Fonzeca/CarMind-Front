import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { ColorPickerControl } from '@iplab/ngx-color-picker';
import { firstValueFrom } from 'rxjs';
import { ZoneRequest } from 'src/app/platform/interfaces/gps_data';
import { AuthService } from 'src/app/platform/services/auth.service';
import { AppService } from 'src/app/platform/services/core/app.service';
import { GpsService } from 'src/app/platform/services/gps.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-zone-details',
  templateUrl: './gps-zone-details.component.html',
  styleUrls: ['./gps-zone-details.component.scss']
})
export class GpsZoneDetailsComponent extends BaseComponent implements OnInit {

  strokeColorControl = new ColorPickerControl() 
  fillColorControl = new ColorPickerControl()
  isStrokeColorPickerVisible: boolean = false;
  isFillColorPickerVisible: boolean = false;
  colorListener : any;

  isAddingPoints: boolean = true;
  isEditingPoints: boolean = false;
  isEdittingZone: boolean = false;

  zone : google.maps.Polygon | undefined;
  zoneName: string | undefined;
  zoneId: number | undefined;
  zoneStrokeColor : string = "#ff0000";
  zoneFillColor : string = "#ffa07a"
  zoneCoords : google.maps.LatLng[] = [];

  color: ThemePalette = 'primary';

  avisarEntrada : boolean = false;
  avisarSalida : boolean = false;

  markersToDrawZone : google.maps.Marker[] = []
  poly: google.maps.Polyline | undefined;


  vehicles : any;
  selectedAll: any;

  constructor(private router: Router, public gps_service: GpsService, public _app: AppService, public vehicle_service: VehiclesService, public auth: AuthService, private renderer: Renderer2) {
    super(); 

    this.strokeColorControl.setColorPresets(["#B80000","#DB3E00","#FCCB00","#008B02","#006B76","#1273DE","#004DCF","#5300EB"]);
    this.fillColorControl.setColorPresets(["#EB9694","#FAD0C3","#FEF3BD","#C1E1C5","#BEDADC","#C4DEF6","#BED3F3","#D4C4FB"]);

    if (this.router.getCurrentNavigation() === null || this.router.getCurrentNavigation()!.extras.state! === undefined) {
      this.router.navigate([this.getAppRoutes.platform.gps.zones.route]);
      return;
    }

    this.isAddingPoints =  this.router.getCurrentNavigation()!.extras.state!['isCreatingZone'];
    this.isEdittingZone = !this.router.getCurrentNavigation()!.extras.state!['isCreatingZone'];
    
    if(this.isAddingPoints){
      this.zoneName = this.router.getCurrentNavigation()!.extras.state!['zoneName'];
      
      this.setMapToDrawZone();

      this.getAllVehicles();
    } 
    else{
      this.zoneName = this.router.getCurrentNavigation()!.extras.state!['zone'].nombre;
      this.zoneId =  this.zoneStrokeColor = this.router.getCurrentNavigation()!.extras.state!['zone'].id;
      this.zoneStrokeColor = this.router.getCurrentNavigation()!.extras.state!['zone'].color_linea;
      this.zoneFillColor = this.router.getCurrentNavigation()!.extras.state!['zone'].color_relleno;
      this.avisarEntrada = this.router.getCurrentNavigation()!.extras.state!['zone'].avisar_entrada;
      this.avisarSalida = this.router.getCurrentNavigation()!.extras.state!['zone'].avisar_salida;

      //Proceso para pasar los puntos de un string a el objeto de tipo LatLng necesario para dibujar la zona posteriormente
      var splittedPoints : string[] = this.router.getCurrentNavigation()!.extras.state!['zone'].puntos.split('; ')
      this.zoneCoords =  splittedPoints.map((point : any) => {
        var splittedPoint : string[] = point.split(',');
        return new google.maps.LatLng(+splittedPoint[0], +splittedPoint[1]);
      }) 
      //Marcar los checkbox de los vehículos que tiene esta zona
      var selectedVehicles : number[] = this.router.getCurrentNavigation()!.extras.state!['zone'].vehiculos_ids
      this.getAllVehicles().then(() => {
        selectedVehicles.forEach((id: number) => {
          var vehicle = this.vehicles.find((v : any) => v.vehicle.id === id);
          if (vehicle  !== undefined) vehicle.selected = true;
        })
      })

      this.setZoneAndAddToMap();
    }
       
  }

  ngOnInit(): void {
  }

  override ngOnDestroy(): void {
    if(this.gps_service.map !== undefined) google.maps.event.clearListeners(this.gps_service.map, 'click');
    if(this.zone !== undefined) this.zone.setMap(null);
    this.markersToDrawZone.forEach(marker => marker.setMap(null));
    if(this.poly !== undefined) this.poly.setMap(null);
  }

  setMapToDrawZone(){

    //El poly es para que el usuario vea las líneas 
    this.poly = new google.maps.Polyline({
      strokeColor:   this.zoneStrokeColor,
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });
    this.poly.setMap(this.gps_service.map!);

    this.gps_service.map!.addListener('click', (mapsMouseEvent :any) =>{

       //Insertar puntos en el poly para que se dibujen las lineas en cada click
      const path = this.poly!.getPath();
      path.push(mapsMouseEvent.latLng);

      //Los markers es para que el usuario vea mas detalladamente dónde colocó el punto
      var newMarker : google.maps.Marker = new google.maps.Marker({
        position: mapsMouseEvent.latLng.toJSON(),
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 4,
          fillColor:  this.zoneFillColor,
          strokeColor:  this.zoneStrokeColor,
        },
        draggable: true,
        map: this.gps_service.map,
      })
      
      this.markersToDrawZone.push(newMarker);

      var index : number = 0;
      
      //Cuando alguien arrastrar un marcador, hay que actualizar los puntos del poly
      google.maps.event.addListener(newMarker,'dragstart', () => {

        for(var i = 0; i < path.getLength(); i++){
          if(path.getAt(i).equals(newMarker.getPosition()!)){
            index = i;
            break;
          }
        }

        path.removeAt(index);
      })

      google.maps.event.addListener(newMarker,'dragend', () => {
        path.insertAt(index, newMarker.getPosition()!);
      })

    })
  }

  setZoneAndAddToMap(){
    this.zone = new google.maps.Polygon({
      paths: this.zoneCoords,
      strokeColor: this.zoneStrokeColor,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: this.zoneFillColor,
      fillOpacity: 0.35,
      editable: false
    });
    this.zone.setMap(this.gps_service.map!);
  }

  finishCreatingZone(){
    if(this.isAddingPoints || this.isEditingPoints){
      if(this.markersToDrawZone.length < 3 || this.markersToDrawZone.length > 30){
        this._app.sw.alertError("Inserte entre 3 y 30 puntos")
        return;
      } 
      
      //En esta variable se guardan los puntos de la zona ya terminada
      this.zoneCoords = this.markersToDrawZone.map(marker => marker.getPosition()!);
      
      //Dibujar la zona en el mapa
      this.setZoneAndAddToMap();
      
      //Borrar las lineas
      this.poly!.setMap(null);
      this.poly = undefined;
      
      //Borrar los marcadores
      this.markersToDrawZone.forEach(marker => marker.setMap(null));
      this.markersToDrawZone = [];
  
      google.maps.event.clearListeners(this.gps_service.map!, 'click');
  
      this.isAddingPoints = false;
      this.isEditingPoints = false;
    }else{

      //Pasar los puntos de la zona a string para poder guardarlo en el formato correspondinete en la BD
      var points : string[] = this.zoneCoords.map(position => {
        return position.lat().toString() + "," + position.lng().toString()
      });

      //OBtener la lista de vehiculos seleccionados
      var vehiclesIds : number[] = this.vehicles.filter((vehicle : any) => vehicle.selected).map((vehicle : any) => vehicle.vehicle.id)

      var newZone : ZoneRequest = {
        nombre: this.zoneName!, 
        color_linea: this.zoneStrokeColor, 
        color_relleno: this.zoneFillColor, 
        puntos: points.join("; "), 
        empresa_id: this.auth.user!.empresa,
        vehiculos_ids: vehiclesIds,
        avisar_entrada: this.avisarEntrada,
        avisar_salida: this.avisarSalida
      } 

      //Actualizar la zona o crearla, dependiendo de si se viene de la pantalla de crear o de editar
      if(this.isEdittingZone)  this.gps_service.editZoneById(this.zoneId!.toString(), newZone).subscribe(()=>this.goToAllZones());
      else this.gps_service.createZone(newZone).subscribe(()=>this.goToAllZones());
    }
  }

  goToAllZones(){
      //Borrar la zona del mapa y volver a la página anterior
      if(this.zone !== undefined) this.zone.setMap(null);
      this.zone = undefined;
      this.router.navigate([this.getAppRoutes.platform.gps.zones.route]);
  }

  deltePointsFromZone(){
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar los puntos de esta zona? Tendrás que volver a insertarlos`,
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
        this.isEditingPoints = true;

        this.zone!.setMap(null);
        this.zone = undefined;

        this.poly = new google.maps.Polyline({
          strokeColor:  this.zoneStrokeColor,
          strokeOpacity: 1.0,
          strokeWeight: 3,
        });

        this.setMapToDrawZone();
      }
    })
  }

  changeAvisarEntrada(){
    this.avisarEntrada = !this.avisarEntrada
  }

  changeAvisarSalida(){
    this.avisarSalida = !this.avisarSalida
  }

  async getAllVehicles(){
    var vehiclesResponse = await  firstValueFrom(this.vehicle_service.getAll())
    this.vehicles = vehiclesResponse.filter(v=> v.imei !== undefined).map(vehicle => {
      return {vehicle: {imei: vehicle.imei, nombre: vehicle.nombre, patente: vehicle.patente, id: vehicle.id}, selected: false}
    })
  }

  selectAll() {
    for (var i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.vehicles.every(function(item:any) {
        return item.selected == true;
      })
  }

  public boxStrokeColorClicked(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.getClickEventInColorPicker();
    this.isStrokeColorPickerVisible = true;
  }

  public boxFillColorClicked(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.getClickEventInColorPicker();
    this.isFillColorPickerVisible = true;
  }

  getClickEventInColorPicker(){
    this.colorListener = this.renderer.listen('window', 'click',(e:Event)=>{
      this.isFillColorPickerVisible = false;
      this.isStrokeColorPickerVisible = false;
      this.onColorChanged();
      this.colorListener();
    })
  }

  onColorChanged(){
    this.zone!.setMap(null);

    this.zone = new google.maps.Polygon({
      paths: this.zoneCoords,
      strokeColor: this.zoneStrokeColor,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: this.zoneFillColor,
      fillOpacity: 0.35,
      editable: false,
    });

    this.zone.setMap(this.gps_service.map!);
  }

}
