import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Comentario, CreateComentario, Defect } from '../interfaces/maintenance';
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

  updateStateDefectById(defectId: string, state: string) : Observable<number>{
    const {
      defects: { update_state: url },
    } = endpoints;
    return this.put(url.replace(':id', defectId.toString()) + "?newState=" + state, {});
  }

  createComment(newCommment : CreateComentario) : Observable<number>{
    const {
      defects: { create_comment: url },
    } = endpoints;
    return this.post(url, newCommment);
  }

  getCommentsByTopicAndTopicId(topic : string, topicId : string) : Observable<Comentario[]>{
    const {
      defects: { get_comment_by_topic_and_topicId: url },
    } = endpoints;
    return this.get(url + "?tema=" + topic + "&tema_id=" + topicId);
  }

}
