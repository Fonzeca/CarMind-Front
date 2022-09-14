import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GpsRouteData, gps_data, RouteRequest, VehiclesImeisRequest, VehicleState } from '../interfaces/gps_data';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class GpsService extends ApiService {

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


}
