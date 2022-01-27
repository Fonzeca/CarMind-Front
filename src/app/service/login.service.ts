import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Login } from '../Interface/login';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

url : string = 'http://vps-1791261-x.dattaweb.com:2233/';
logged= new BehaviorSubject<boolean>(false);
currentUserSubject!: BehaviorSubject<Login>;
currentUser!: Observable<Login>;
  constructor(private http:HttpClient) {

    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(sessionStorage.getItem('token') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();

  }

login(usuario: Login) : Observable<any>{
let path = `login?username=${usuario.usuario}&password=${usuario.contraseña}`;
  return this.http.post<any>(this.url + path, usuario)
  .pipe(map(data => {
    sessionStorage.setItem('token', data.token);
    this.currentUserSubject.next(data);
    this.logged.next(true);

   /*  console.log(data); */

    return data;
  }));

}

logout(): void{
  sessionStorage.removeItem('Usuario');
  this.logged.next(false);

}

/* getToken(token: string): any {
  return sessionStorage.getItem('Usuario');
} */

}
