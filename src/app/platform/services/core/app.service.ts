import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, finalize } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { SweetAlertService } from './sweetAlert.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AppService extends ApiService {

  constructor(public sw: SweetAlertService, http:HttpClient) {
    super(http)
  }

}
