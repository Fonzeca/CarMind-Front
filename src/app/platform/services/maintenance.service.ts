import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Defect } from '../interfaces/maintenance';
import { ApiService } from './core/api.service';
import endpoints from './core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService extends ApiService {

  constructor(http: HttpClient) {
    super(http);
  }

  getDefects() : Observable<Defect[]>{
    const {
      defects: { get_all: url },
    } = endpoints;
    return this.get(url);
  }

  updatePriorityDefectById(defectId: string, priority: number) : Observable<number>{
    const {
      defects: { update_priority: url },
    } = endpoints;
    return this.put(url.replace(':id', defectId.toString()) + "?newPriority=" + priority, {});
  }

}
