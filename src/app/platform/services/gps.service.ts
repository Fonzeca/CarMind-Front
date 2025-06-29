import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { gps_data, GpsRouteData, RouteRequest, VehiclesImeisRequest, VehicleState, ZoneRequest, ZoneView } from '../interfaces/gps_data';
import { AuthService } from './auth.service';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class GpsService extends ApiService {

  map?: google.maps.Map;

  zones: ZoneView[] = [];

  onMapCreated: EventEmitter<boolean> = new EventEmitter();


  isInDetails: boolean = false;


  constructor(http: HttpClient) {
    super(http);
  }

  async fetchZones(auth: AuthService) {
    var response: any;
    if (auth.user === undefined || Object.keys(auth.user).length === 0) {
      const user = await firstValueFrom(auth.getLoggedUser());
      response = await firstValueFrom(this.getZonesByEmpresaId(user.empresa));
    } else {
      response = await firstValueFrom(this.getZonesByEmpresaId(auth.user.empresa));
    }
    this.zones = response;

    this.zones.forEach(z => {
      //Proceso para pasar los puntos de un string a el objeto de tipo LatLng necesario para dibujar la zona posteriormente
      var splittedPoints: string[] = z.puntos.split('; ')
      var path = splittedPoints.map((point: string) => {
        var latLang: string[] = point.split(',');
        return new google.maps.LatLng(+latLang[0], +latLang[1]);
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
      newZoneDraw.setMap(this.map!);
      z.zonePolygon = newZoneDraw;
    });
    return this.zones;
  }

  setVisibilityOfZones(visible: boolean) {
    this.zones.forEach(z => {
      z.isHidden = !visible;
      z.zonePolygon?.setMap(visible ? this.map! : null);
    });
  }

  getZoneById(id: number): ZoneView | undefined {
    return this.zones.find(z => z.id === id);
  }

  getAllZones(): ZoneView[] {
    if (this.zones.length === 0) {
      console.warn('No zones available. Please fetch zones first.');
      return [];
    }
    return this.zones;
  }

  setVisibilityOfSpeedGraph(element: HTMLDivElement | null, visible: boolean) {
    if (!element) {
      console.error('No chart container element passed');
      return;
    }

    if (visible) {
      element.classList.remove('close');
    } else {
      element.classList.add('close');
    }
  }

  getVehiclesStateByImeis(params: VehiclesImeisRequest): Observable<VehicleState[]> {
    const {
      trackin: { get_vehicles_state_by_imeis: url },
    } = endpoints;
    return this.post(url, params);
  }

  getLastLogByIMEI(imei: string): Observable<gps_data> {
    const {
      trackin: { get_last_log: url },
    } = endpoints;
    return this.get(url + "?imei=" + imei);
  }
  getRouteByImei(params: RouteRequest): Observable<GpsRouteData[]> {

    const {
      trackin: { get_route: url },
    } = endpoints;
    return this.post(url, params);
  }

  getZonesByEmpresaId(id: string): Observable<ZoneView[]> {
    const {
      trackin: { get_zones_by_empresa_id: url },
    } = endpoints;
    return this.get(url + "?id=" + id);
  }

  createZone(zone: ZoneRequest): Observable<number> {
    const {
      trackin: { create_zone: url },
    } = endpoints;
    return this.post(url, zone);
  }

  editZoneById(zoneId: string, zone: ZoneRequest): Observable<number> {
    const {
      trackin: { edit_zone_by_id: url },
    } = endpoints;
    return this.put(url + "?id=" + zoneId, zone);
  }

  deleteZone(zoneId: string): Observable<number> {
    const {
      trackin: { delete_zone: url },
    } = endpoints;
    return this.delete(url + "?id=" + zoneId);
  }

}
