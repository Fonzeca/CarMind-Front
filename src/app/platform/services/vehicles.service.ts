import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { vehicle } from '../interfaces/vehicle';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService  extends ApiService {


  private _getAll: BehaviorSubject<vehicle[]> = new BehaviorSubject<vehicle[]>([]);
  public getAll$: Observable<vehicle[]> = this._getAll.asObservable();

  private _getById: BehaviorSubject<vehicle[]> = new BehaviorSubject<vehicle[]>([]);
  public getById$: Observable<vehicle[]> = this._getById.asObservable();



  constructor(http:HttpClient, public router:Router){
    super(http)
  }

  getAll(): Observable<vehicle[]> {
    const { vehicles : { get_all:url } } = endpoints;
    return this.get(url).pipe(
      tap((response: vehicle[])=> this._getAll.next(response))
    );
  }

  getById(id:number): Observable<vehicle> {
    const { vehicles : { get_by_id : url } } = endpoints;
    return this.get(url.replace(":id",id.toString()));
  }

  create(params:HttpParams) {
    const { vehicles : { post:url } } = endpoints;
    return this.post(url, params).pipe(
      tap(response=>{
        this.getAll().subscribe();
      })
    );
  }

  update(params:HttpParams) {
    const { vehicles : { put:url } } = endpoints;
    return this.put(url, params).pipe(
      tap(response=>{
        this.getAll().subscribe();
      })
    );
  }


}
