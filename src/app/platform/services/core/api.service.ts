import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, finalize } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'

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


  // // HttpClient API get() method => Fetch employees list
  // getEmployees(): Observable<Employee> {
  //   return this.http
  //     .get<Employee>(this.apiURL + '/employees')
  //     .pipe(retry(1), catchError(this.handleError));
  // }
  // // HttpClient API get() method => Fetch employee
  // getEmployee(id: any): Observable<Employee> {
  //   return this.http
  //     .get<Employee>(this.apiURL + '/employees/' + id)
  //     .pipe(retry(1), catchError(this.handleError));
  // }
  // // HttpClient API post() method => Create employee
  // createEmployee(employee: any): Observable<Employee> {
  //   return this.http
  //     .post<Employee>(
  //       this.apiURL + '/employees',
  //       JSON.stringify(employee),
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }
  // // HttpClient API put() method => Update employee
  // updateEmployee(id: any, employee: any): Observable<Employee> {
  //   return this.http
  //     .put<Employee>(
  //       this.apiURL + '/employees/' + id,
  //       JSON.stringify(employee),
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }
  // // HttpClient API delete() method => Delete employee
  // deleteEmployee(id: any) {
  //   return this.http
  //     .delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';

    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    Swal.fire({
      title: 'Message',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Ok'
    })

    return throwError(() => {
      return errorMessage;
    });
  }
}
