import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { evaluation } from '../interfaces/evaluation';
import { FormCreate, formInterface } from '../interfaces/form';
import { notifications } from '../interfaces/notifications';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

@Injectable({
  providedIn: 'root',
})
export class FormsService extends ApiService {

  private _getHistory: BehaviorSubject<evaluation[]> = new BehaviorSubject<evaluation[]>([]);
  public getHistory$: Observable<evaluation[]> = this._getHistory.asObservable();

  private _getAllForms: BehaviorSubject<formInterface[]> = new BehaviorSubject<formInterface[]>([]);
  public getAllForms$: Observable<formInterface[]> = this._getAllForms.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  getHistory(): Observable<any> {
    const { forms: { get_all_history: url } } = endpoints;
    return this.get(url).pipe(
      map((response: any[]) => {
        this._getHistory.next(response);
        return { response: response, getHistory$: this.getHistory$ };
      })
    );
  }

  getAllForms(): Observable<any> {
    const { forms: { get_all: url } } = endpoints;
    return this.get(url)
      .pipe(
        map((response: any[]) => {
          this._getAllForms.next(response);
          return { response: response, getAllForms$: this.getAllForms$ };
        })
      );
  }

  create(param:FormCreate){
    const { forms: { post: url } } = endpoints;
    return this.post(url,param);
  }
}
