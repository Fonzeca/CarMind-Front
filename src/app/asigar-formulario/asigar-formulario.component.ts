import { Altaseccion } from './../service/model/altaSeccion';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiAltaSeccionService } from '../service/api-alta-seccion.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asigar-formulario',
  templateUrl: './asigar-formulario.component.html',
  styleUrls: ['./asigar-formulario.component.css']
})
export class AsigarFormularioComponent implements OnInit {



  preguntaVisual!:string
  asignarRespuesta!: string;
  formatoRespuesta!: string;

  constructor(private formBuilder: FormBuilder, private router: Router) { }



  enviarDatosSeccion() {
     console.log(this.asignarRespuesta)
     console.log(this.preguntaVisual)
     console.log(this.formatoRespuesta)
     this.preguntaVisual = '';

  }

  ngOnInit(): void {
  }

}
