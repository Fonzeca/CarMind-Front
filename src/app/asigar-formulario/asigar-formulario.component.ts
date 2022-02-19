import { Altaseccion } from './../service/model/altaSeccion';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  character!: AsigarFormularioComponent;
  @ViewChild('asAgregar') agregarPregunta!: ElementRef;
  @ViewChild('asFormato') formatoPregunta!: ElementRef;
  @Input('acount-id') preguntas!: any
  preguntasDos = new Array();
  style = new Array();
  constructor(private formBuilder: FormBuilder, private router: Router, private renderer2: Renderer2) { }




  enviarDatosSeccion() {
     /* console.log(this.asignarRespuesta)
     console.log(this.preguntaVisual)
     console.log(this.formatoRespuesta) */
     this.preguntaVisual = '';

     const height = document.querySelector('.card');
     let x = this.renderer2.setStyle(height, 'height', '1050px' )
     this.preguntasDos.push('Alan Rios');
     this.style.push('1')


  }



  ngOnInit(): void {
  }

}
