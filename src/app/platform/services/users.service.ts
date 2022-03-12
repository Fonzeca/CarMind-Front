import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject, Observable, switchMap,
  tap
} from 'rxjs';
import { user } from '../interfaces/user';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';



@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {

  private _getAll: BehaviorSubject<user[]> = new BehaviorSubject<user[]>([]);
  public getAll$: Observable<user[]> = this._getAll.asObservable();

  private _getById: BehaviorSubject<user[]> = new BehaviorSubject<user[]>([]);
  public getById$: Observable<user[]> = this._getById.asObservable();

  constructor(http: HttpClient, public router: Router) {
    super(http);
  }

  getAll(): Observable<user[]> {
    const { users: { get_all : url } } = endpoints;
    return this.get(url).pipe(
      switchMap((response: user[]) => {
        this._getAll.next(response);
        return this.getAll$
      })
    );
  }

  create(params: HttpParams) {
    const {
      users: { post: url },
    } = endpoints;
    return this.post(url, params).pipe(
      tap((response) => {
        this.getAll().subscribe();
      })
    );
  }

  update(params: HttpParams) {
    const {
      users: { put: url },
    } = endpoints;
    return this.put(url, params).pipe(
      tap((response) => {
        this.getAll().subscribe();
      })
    );
  }

  deleteById(id:number) {
    const {
      users: { put: url },
    } = endpoints;
    return this.delete(url.replace(':id', id.toString())).pipe(
      tap((response) => {
        this.getAll().subscribe();
      })
    );
  }

}
