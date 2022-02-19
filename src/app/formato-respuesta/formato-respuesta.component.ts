import { AsigarFormularioComponent } from './../asigar-formulario/asigar-formulario.component';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-formato-respuesta',
  templateUrl: './formato-respuesta.component.html',
  styleUrls: ['./formato-respuesta.component.css'],
})
export class FormatoRespuestaComponent implements OnInit {
  constructor(private renderer2: Renderer2, private elRef: ElementRef) {}
  preguntas = new Array('1');
 
  agregarPregunta() {
   let p = document.querySelector('.formato')

   this.preguntas.push('1');


  }
  ngOnInit(): void {}
}
