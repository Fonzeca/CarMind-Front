import { Altaseccion } from './model/altaSeccion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAltaSeccionService {



  constructor(private http: HttpClient, private router:Router) { }

  enviarDatos(preguntaVisual: string, asignarRespuesta: string, formatoRespuesta: string): Observable<Altaseccion> {


    return this.enviarDatos(preguntaVisual, asignarRespuesta, formatoRespuesta).pipe(
      map((data) => {

        return data;
      }),
    );

  }

}
