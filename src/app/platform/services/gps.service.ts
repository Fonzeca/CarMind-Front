import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GpsRouteData, gps_data, RouteRequest, VehiclesImeisRequest, VehicleState, ZoneRequest, ZoneView } from '../interfaces/gps_data';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class GpsService extends ApiService {

  map?: google.maps.Map;
  
  isInDetails : boolean = false;


  constructor(http: HttpClient) {
    super(http);
  }

  getVehiclesStateByImeis(params: VehiclesImeisRequest) : Observable<VehicleState[]>{
    const {
      trackin: { get_vehicles_state_by_imeis: url },
    } = endpoints;
    return this.post(url, params);
  }
  
  getLastLogByIMEI(imei: string) : Observable<gps_data>{
    const {
      trackin: { get_last_log: url },
    } = endpoints;
    return this.get(url + "?imei=" + imei);
  }
  getRouteByImei(params: RouteRequest) : Observable<GpsRouteData[]>{

    const {
      trackin: { get_route: url },
    } = endpoints;
    return this.post(url, params);
  }

  getZonesByEmpresaId(id: string) : Observable<ZoneView[]>{
    const {
      trackin: { get_zones_by_empresa_id: url },
    } = endpoints;
    return this.get(url + "?id="+ id);
  }

  createZone(zone: ZoneRequest) : Observable<number>{
    const {
      trackin: { create_zone: url },
    } = endpoints;
    return this.post(url, zone);
  }

  editZoneById(zoneId: string, zone: ZoneRequest) : Observable<number>{
    const {
      trackin: { edit_zone_by_id: url },
    } = endpoints;
    return this.put(url + "?id=" + zoneId, zone);
  }

  deleteZone(zoneId: string) : Observable<number>{
    const {
      trackin: { delete_zone: url },
    } = endpoints;
    return this.delete(url + "?id=" + zoneId);
  }

}
