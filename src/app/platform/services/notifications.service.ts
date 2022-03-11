import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { notifications } from '../interfaces/notifications';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends ApiService {

  private _getNotifications: BehaviorSubject<notifications[]> = new BehaviorSubject<notifications[]>([]);
  public getNotifications$: Observable<notifications[]> = this._getNotifications.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  getNotifications(): Observable<notifications[]> {
    const { notifications: { get : url } } = endpoints;
    return this.get(url).pipe(
      switchMap((response: any[]) => {
        this._getNotifications.next(response);
        return this.getNotifications$
      })
    );
  }

}
