import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

url : string = 'http://vps-1791261-x.dattaweb.com:2233/login';
logged= new BehaviorSubject<boolean>(false);

  constructor() { }
}
