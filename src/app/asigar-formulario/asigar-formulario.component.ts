import { Altaseccion } from './../service/model/altaSeccion';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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


  constructor(private formBuilder: FormBuilder, private router: Router, private renderer2: Renderer2) { }

agregarComponents(){
  const asAgregar = document.querySelector(".asignar")
  this.renderer2.addClass(asAgregar, 'agregarPregunta');
  const asFormato = document.querySelector(".formato")
  this.renderer2.addClass(asFormato, 'agregarFormato');

}

  enviarDatosSeccion() {
     console.log(this.asignarRespuesta)
     console.log(this.preguntaVisual)
     console.log(this.formatoRespuesta)
     this.preguntaVisual = '';

  }

 

  ngOnInit(): void {
  }

}
