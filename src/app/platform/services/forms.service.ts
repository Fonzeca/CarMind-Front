import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { evaluation } from '../interfaces/evaluation';
import { FormCreate, formInterface } from '../interfaces/form';
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

  private _getAllFormsExcept: BehaviorSubject<formInterface[]> = new BehaviorSubject<formInterface[]>([]);
  public getAllFormsExcept$: Observable<formInterface[]> = this._getAllFormsExcept.asObservable();

  private _getHistorialById: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public getHistorialById$: Observable<any> = this._getHistorialById.asObservable();

  private _getEvaluationById: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public getEvaluationById$: Observable<any> = this._getEvaluationById.asObservable();

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

  getAllFormsExcept(_forms: any[]): Observable<any> {
    const { forms: { get_all: url } } = endpoints;
    return this.get(url)
      .pipe(
        map((response: any[]) => {

          var formsNotAssignedToVehicle = response.filter(function(objFromA) {
            return !_forms.find(function(objFromB) {
              return objFromA.id === objFromB.id
            })
          })
          this._getAllFormsExcept.next(formsNotAssignedToVehicle);

          return { response: formsNotAssignedToVehicle, getAllFormsExcept$: this.getAllFormsExcept$ };
        })
      );
  }

  create(param:FormCreate){
    const { forms: { post: url } } = endpoints;
    param.preguntas.forEach(pregunta => {
      if (pregunta.tipo === 'S1' || pregunta.tipo === 'S2'){}else{
        delete pregunta.opciones;
      }
    });
    return this.post(url,param);
  }

  deleteEvaluacion(id:string){
    const { forms: { delete: url } } = endpoints;
    return this.delete(url.replace(":id",id.toString()));
  }

  getEvaluacionById(id:string){
    const { forms: { get_evaluation: url } } = endpoints;
    this._getHistorialById.next(null);
    return this.get(url.replace(":id",id.toString())).pipe(
      switchMap((data:any) => {
        this._getHistorialById.next(data);
        return this.getHistorialById$;
      })
    );
  }

  updateEvaluacion(param:FormCreate, id:string){
    const { forms: { put: url } } = endpoints;
    param.preguntas.forEach(pregunta => {
      if (pregunta.tipo === 'S1' || pregunta.tipo === 'S2'){}else{
        delete pregunta.opciones;
      }
    });
    return this.put(url.replace(":id",id.toString()),param);
  }

  getHistorialById(id:number) {
    const { forms: { get_historial_by_id: url } } = endpoints;
    this._getHistorialById.next(null);
    return this.get(url.replace(":id",id.toString())).pipe(
      switchMap((data:any) => {
        this._getHistorialById.next(data);
        return this.getHistorialById$;
      })
    );
  }
}
