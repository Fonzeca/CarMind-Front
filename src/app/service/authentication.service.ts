import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Login } from '../Interface/login';
import { ApiGatewayService } from './api-gateway.service';
import { Loggeduser } from './model/loggedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggeduser!: Loggeduser

  constructor(private api: ApiGatewayService, private router : Router) { }

  login(usuario: Login): Observable<any> {
    let path = `login?username=${usuario.usuario}&password=${usuario.contraseña}`;

    return this.api.login(usuario.usuario, usuario.contraseña).pipe(
      map((data) => {
        this.saveToken(data.token);
        return data;
      }),
    );

  }

  public getLoggedUser(): Observable<Loggeduser> {
    if (!this.loggeduser) {
      if (this.isLogged()) {
        //Llamamos al back.
        return this.api.getLoggedUser().pipe(
          map((data)=>{
            this.loggeduser = data;
            return this.loggeduser;
          })
        );
      } else {
        this.router.navigate(["/login"])
        //TODO: Error, debe redirigirse al login
      }
    }
    return of(this.loggeduser);
  }

  isLogged(): boolean {
    return localStorage.getItem("token") !== null;
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  getToken() : string | null{
    if(this.isLogged()){
      return localStorage.getItem("token");
    }
    return null;
  }

}
