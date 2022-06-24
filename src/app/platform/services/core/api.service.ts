import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiURL:string;


  constructor(private http: HttpClient) {
    this.apiURL =  environment.api
  }
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

  public getBlob(url:string) :Observable<Blob> {
    const header:any = { observe: 'response', responseType: "blob" }
    return this.request(this.http.get<any>(this.apiURL+url, header))
  }

  public post(url:string, data:any){
    return this.request(this.http.post(this.apiURL+url, data));
  }

  public put(url:string, data:any){
    data._method = 'put';
    return this.request(this.http.put(this.apiURL+url, data));
  }

  public delete(url:string){
    return this.request(this.http.delete(this.apiURL+url));
  }

  private request(a:Observable<any>){
    this.tail.push(a);
    return a.pipe(
      retry(1),
      catchError(this.handleError),
      finalize(() => {
        let index = this.tail.indexOf(a);
        this.tail.splice(index, 1);
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
        title: 'Mensaje',
        text: "Sesión Expirada",
        icon: 'error',
        confirmButtonText: 'Ok'
      }).then(()=>{
        localStorage.clear();
        window.location.reload();
      })

    }else{
      Swal.fire({
        title: 'Mensaje',
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
