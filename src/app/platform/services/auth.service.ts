import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {

  constructor(http:HttpClient){
    super(http)
  }

  login(params:any){
    const { login : url } = endpoints
    return this.post(url, params).pipe(
      map((data:any) => {
        localStorage.setItem('token', data.token);
        return data;
      })
    );
  }

  isAuthenticated(){
    return this.token;
  }


}
