import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { gps_data } from '../interfaces/gps_data';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class GpsService extends ApiService {

  constructor(http: HttpClient) {
    super(http);
  }

  getLastLogByIMEI(imei: string) : Observable<gps_data>{
    const {
      trackin: { get_last_log: url },
    } = endpoints;
    return this.get(url + "?imei=" + imei);
  }
}
