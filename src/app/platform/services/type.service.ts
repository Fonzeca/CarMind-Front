import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

@Injectable({
  providedIn: 'root',
})
export class TypeService extends ApiService {

  constructor(http:HttpClient, private router:Router){
    super(http)
      this.getTypes().subscribe();
  }

  tipo_vehiculo = [];
  tipo_documento = [];

  getTypes(){
    const { types : url } = endpoints
    return this.get(url).pipe(
      map((data:any) => {
        this.tipo_vehiculo = data.tipo_vehiculo;
        this.tipo_documento = data.tipo_documento;
      }),
      catchError((e) => {
        localStorage.clear();
        this.router.navigateByUrl("/")
        return throwError(() => {
          return "token fail";
        });
      })
    );
  }

  isAuthenticated(){
    return this.token;
  }
}
