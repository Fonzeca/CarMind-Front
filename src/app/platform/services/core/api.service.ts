import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, finalize } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Define API
  private apiURL = 'http://vps-1791261-x.dattaweb.com:2233';


  constructor(private http: HttpClient) {}
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  tail:Array<any> = [];

  _token:any;

  get token() {
    if(!this._token) this._token = localStorage.getItem('token');
    return this._token;
  }

  set token(value) {
    this._token = value;
  }

  public get(url:string) {
    return this.request(this.http.get(this.apiURL+url));
  }

  public post(url:string, data:any){
    return this.request(this.http.post(this.apiURL+url, data));
  }

  public put(url:string, data:any){
    data._method = 'put';
    debugger
    return this.request(this.http.put(this.apiURL+url, data));
  }

  private request(a:Observable<any>){
    this.tail.push(a);
    console.log(this.tail)
    return a.pipe(
      retry(1),
      catchError(this.handleError),
      finalize(() => {
        let index = this.tail.indexOf(a);
        this.tail.splice(index, 1);
        console.log(this.tail)
      })
    );
  }

  handleError(error: any) {
    let errorMessage = '';

    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if(error.status===403){
      Swal.fire({
        title: 'Message',
        text: "Sesión Expirada",
        icon: 'error',
        confirmButtonText: 'Ok'
      }).then(()=>{
        localStorage.clear();
        window.location.reload();
      })

    }else{
      Swal.fire({
        title: 'Message',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }

    return throwError(() => {
      return errorMessage;
    });
  }
}
