import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';

/**
 * Clase que solo se dedica a tener las llamadas del back.
 * Solo se encarga de que las llamadas se hagan como deben ser.
 * 
 * Evitando asi que a algun enpoint le falten parametros o este mal escrito.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {

  url: string = 'http://vps-1791261-x.dattaweb.com:2233';

  constructor(private http: HttpClient, private router:Router) { }

  login(username: string, password: string): Observable<any> {
    let path = `/login?username=${username}&password=${password}`;

    let llamada = this.http.post<any>(this.url + path, null);

    return this.customPipe(llamada);
  }



  /* Llamadas authenticadas */

  getLoggedUser(): Observable<any> {
    let path = `/loggedUser`
    this.router

    let llamada = this.http.get<any>(this.url + path, {
      headers: { ["Authorization"]: `Bearer ${localStorage.getItem("token")}` }
    });
    return this.customPipe(llamada);
  }




  /* Metodos privados */

  private customPipe(llamada: Observable<any>): Observable<any> {
    return llamada.pipe(
      map((data) => {
        return data;
      }),
      catchError(this.retHandleError(this.router))
    );
  }

  private retHandleError(router: Router){
    return (error: any): Observable<any> =>{
      if(error.status === 403){
        localStorage.removeItem("token")
        this.router.navigate(["/login"])
      }
      return of(error)
    }
  }
}
