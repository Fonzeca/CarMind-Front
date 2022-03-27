import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap
} from 'rxjs';
import { Review } from '../interfaces/review';
import { documents, vehicle } from '../interfaces/vehicle';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

export interface vehicleByIdResponse {
  vehicle: vehicle;
  documents: documents[];
  recentForms: any[];
  recentReviews: any[];
  formsPendingToReview: any[];
  forms: any[];
}

@Injectable({
  providedIn: 'root',
})
export class VehiclesService extends ApiService {
  private _getAll: BehaviorSubject<vehicle[]> = new BehaviorSubject<vehicle[]>(
    []
  );
  public getAll$: Observable<vehicle[]> = this._getAll.asObservable();

  private _getById: BehaviorSubject<vehicle[]> = new BehaviorSubject<vehicle[]>(
    []
  );
  public getById$: Observable<vehicle[]> = this._getById.asObservable();

  constructor(http: HttpClient, public router: Router) {
    super(http);
  }

  getAll(): Observable<vehicle[]> {
    const {
      vehicles: { get_all: url },
    } = endpoints;
    return this.get(url).pipe(
      tap((response: vehicle[]) => this._getAll.next(response))
    );
  }

  getById(id: number): Observable<vehicleByIdResponse> {
    const {
      vehicles: { get_by_id: url },
    } = endpoints;
    return this.get(url.replace(':id', id.toString())).pipe(
      switchMap((data: vehicle) => {
        return forkJoin({
          vehicle: of(data),
          documents: this.getDocumentsByVehicle(data.id),
          forms: this.getFormsByVehicle(data.id),
          recentForms: this.getRecentFormsByVehicle(data.id),
          recentReviews: this.getRecentVehicleReviewsById(data.id),
          formsPendingToReview: this.getFormsPedningToReviewById(data.id),
        });
      })
    );
  }

  getDocumentsByVehicle(id: number): Observable<documents[]> {
    const {
      vehicles: { get_document_by_vehicle: url },
    } = endpoints;
    return this.get(url.replace(':id', id.toString()));
  }

  getFormsByVehicle(id: number): Observable<any[]> {
    const {
      vehicles: { get_forms_by_vehicle: url },
    } = endpoints;
    return this.get(url.replace(':id', id.toString()));
  }

  getRecentFormsByVehicle(id: number): Observable<any[]> {
    const {
      vehicles: { get_recent_forms_by_vehicle: url },
    } = endpoints;
    return this.get(url.replace(':id', id.toString()));
  }

  getRecentVehicleReviewsById(id: number): Observable<any[]> {
    const {
      vehicles: { get_review_history_by_vehicle: url },
    } = endpoints;
    return this.get(
      url.replace(':id', id.toString())
    );
  }

  getFormsPedningToReviewById(id: number): Observable<any[]> {
    const {
      vehicles: { get_forms_pending_to_review_by_vehicle: url },
    } = endpoints;
    return this.get(
      url.replace(':id', id.toString())
    );
  }

  getVehicleDocumentById(id: number, tipo: string): Observable<any> {
    const {
      vehicles: { get_document: url },
    } = endpoints;
    return this.getBlob(
      url.replace(':id', id.toString()).replace(':tipo', tipo)
    );
  }

  documentAssignment(id:number, params: HttpParams) {
    const {
      vehicles: { post_assign_evaluation: url },
    } = endpoints;
    return this.post(url.replace(':id', id.toString()), params);
  }

  createReview(params: Review) {
    const {
      vehicles: { post_review: url },
    } = endpoints;
    return this.post(url, params).pipe(
      tap((response) => {
        this.getAll().subscribe();
      })
    );
  }

  create(params: HttpParams) {
    const {
      vehicles: { post: url },
    } = endpoints;
    return this.post(url, params).pipe(
      tap((response) => {
        this.getAll().subscribe();
      })
    );
  }

  update(params: HttpParams) {
    const {
      vehicles: { put: url },
    } = endpoints;
    return this.put(url, params);
  }

  uploadDocument(id: number, tipo: string, vencimiento: string, file: File) {
    const {
      vehicles: { post_upload_document: url },
    } = endpoints;
    const formData = new FormData();
    formData.append('file', file);
    return this.post(
      `${url.replace(':id', id.toString()).replace(':tipo', tipo)}?vencimiento=${vencimiento}`,
      formData
    ).pipe(
      map(() => {
        this.getById(id).subscribe();
      })
    );
  }
}
