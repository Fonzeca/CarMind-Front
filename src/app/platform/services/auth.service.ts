import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { user } from '../interfaces/user';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {

  user:  user | undefined;

  private _getLoggedUser: BehaviorSubject<user> = new BehaviorSubject<user>((<any>{}));
  public getLoggedUser$: Observable<user> = this._getLoggedUser.asObservable();

  constructor(http:HttpClient, public router:Router){
    super(http)

    this.getLoggedUser$.subscribe((res: user) => this.user = res);
  }

  login(params:any){
    const { auth : {login : url} } = endpoints
    return this.post(url, params).pipe(
      map((data:any) => {
        if(!data.mustChangePassword) localStorage.setItem('token', data.token);
        return data;
      })
    );
  }

  getLoggedUser(){
    const { auth:{ loggedUser: url} } = endpoints
    return this.get(url).pipe(
      switchMap((data:any) => {
        this._getLoggedUser.next(data);
        return this.getLoggedUser$;
      })
    );
  }

  updateLoggedUser(params:any){
    const { auth:{ put_user: url} } = endpoints
    return this.put(url, params).pipe(
      switchMap(()=> this.getLoggedUser())
    );
  }

  isAuthenticated(){
    return this.token;
  }

  changePasswordAtFirstLogin(params:any){
    const { auth : {firstLogin : url} } = endpoints
    return this.post(url, params).pipe(
      map((data:any) => {
        return data;
      })
    );
  }

  sendEmailToChangePass(params:any){
    const { auth : {sendEmailToChangePass : url} } = endpoints
    return this.post(url, params).pipe(
      map((data:any) => {
        return data;
      })
    );
  }

  sendCodeToChangePass(data:any){
    const { auth : {sendCodeToChangePass : url} } = endpoints
    return this.post(url, data).pipe(
      map((data:any) => {
        return data;
      })
    );
  }

  changePass(data:any){
    const { auth : {changePassword : url} } = endpoints
    return this.post(url, data).pipe(
      map((data:any) => {
        return data;
      })
    );
  }
}
