import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { Login } from '../Interface/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  usuario = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('\b[\w.-]+@[\w.-]+.\w{2,4}\b')]);
  contraseña =  new FormControl('', [Validators.required, Validators.maxLength(50)])
  resultado!: string;
  url: string = 'http://vps-1791261-x.dattaweb.com:2233/';
  logged = new BehaviorSubject<boolean>(false);
  currentUserSubject!: BehaviorSubject<Login>;
  currentUser!: Observable<Login>;
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Login>(
      JSON.parse(sessionStorage.getItem('token') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(usuario: Login): Observable<any> {
    let path = `login?username=${usuario.usuario}&password=${usuario.contraseña}`;

    return this.http.post<any>(this.url + path, usuario).pipe(
      map((data) => {
        sessionStorage.setItem('token', data.token);

        this.currentUserSubject.next(data);

        this.logged.next(true);

        this.router.navigate(['/home']);

        return data;
      }),
      catchError(this.handlerError)
    );
  }

  handlerError(error: any) {
    console.log(error);
    return of(error);
  }

  logout(): void {
    sessionStorage.removeItem('Usuario');
    this.logged.next(false);
  }

  errorUsuario(){
    if((this.usuario.dirty || this.usuario.touched) && this.usuario.errors){
      this.resultado = "No ha ingresado su email";

    }
    if(this.usuario.hasError('pattern') && this.usuario.errors){
      this.resultado = "El campo esta incorrecto";

    }




    else if(this.usuario.hasError('maxlength') && this.usuario.errors){
      this.resultado = "El maximo de letras es 30";

    }

    return this.resultado;
  }

  errorContrasenia(){
    if((this.contraseña.dirty || this.contraseña.touched) && this.contraseña.errors){
      this.resultado = "No ha ingresa su contraseña";

    }

    else if(this.contraseña.hasError('maxlength') && this.contraseña.errors){
      this.resultado = "El maximo de letras es 30";

    }

    return this.resultado;
  }

  /* getToken(token: string): any {
  return sessionStorage.getItem('Usuario');
} */
}
