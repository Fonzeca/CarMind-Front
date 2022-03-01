import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { vehicle } from '../interfaces/vehicle';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService  extends ApiService {

  constructor(http:HttpClient){
    super(http)
  }

  getAll(): Observable<vehicle[]> {
    const { vehicles : { get_all:url } } = endpoints
    return this.get(url);
  }

}
