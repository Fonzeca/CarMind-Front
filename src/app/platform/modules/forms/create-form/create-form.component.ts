import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  FormCreate,
  Opciones,
  Pregunta
} from 'src/app/platform/interfaces/form';
import { AppService } from 'src/app/platform/services/core/app.service';
import { FormsService } from 'src/app/platform/services/forms.service';
import { TypeService } from 'src/app/platform/services/type.service';
import { AppRoutes } from 'src/app/routes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  filterInput: string = '';

  @ViewChild('Intitle') Intitle!: ElementRef;

  @ViewChildren('inputFocus') inputs!: QueryList<ElementRef>;

  addPregunta!: Pregunta;

  addSectionSubmit = false;
  formSubmit = false;

  form: FormCreate = {
    titulo: '',
    preguntas: [],
  };

  editTitle = false;

  editing_index: any;

  form_id!:string;

  constructor(
    public _type: TypeService,
    public _form: FormsService,
    public _app: AppService,
    public _actR:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clearAddPregunta();
    this._actR.params.subscribe((param:Params)=>{
      if(param["name"]){
        this.form.titulo = param["name"];
      }
      if(param["id"]){
        this._form.getEvaluacionById(param["id"]).subscribe(
          res=>{
            this.form_id = param["id"];
            this.form.titulo = res.titulo;
            this.form.preguntas = res.preguntas;
          }
        )
      }
    });
  }

  addQuestion() {
    this.form.preguntas?.push({
      tipo: 'S3',
      crucial: true,
      descripcion: '',
      opciones: [
        {
          opcion:"",
          crucial:true
        }
      ],
    });
  }

  focusElement(index: number) {
    const input = this.inputs.find((x, i) => i == index);
    if (input) input.nativeElement.focus();
  }

  removePregunta(i: number, preguntas: Pregunta[] = this.form.preguntas) {
    preguntas?.splice(i, 1);
  }

  addOption(question: Pregunta, i: number) {
    question.opciones.splice(i + 1, 0,  {
      opcion:"",
      crucial:true
    });
  }

  removeOption(question: Pregunta, i: number) {
    question.opciones.splice(i, 1);
  }

  event(e: any, opciones: Opciones[], index: number) {
    opciones[index].opcion = e.currentTarget.value;
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  editTitleFn() {
    this.editTitle = !this.editTitle;
    setTimeout(() => this.Intitle.nativeElement.focus(), 0);
  }

  deleteTitleFn() {
    Swal.fire({
      title: `¿Estás seguro que querés eliminar este formulario?`,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      customClass: {
        actions: 'my-actions',
        confirmButton: "btn btn-success m-btn-succes",
        cancelButton: 'order-1 right-gap',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this._form.deleteEvaluacion(this.form_id).subscribe((res) => {
          this._app.sw.alertSuccess('Formulario eliminado').then(() => {
            this._app.router.navigateByUrl(AppRoutes.platform.forms.route);
          });
        });
      }
    })
  }

  editPregunta(i: number, pregunta: Pregunta) {
    this.editing_index = i;
    const tempPregunta = { ...pregunta };
    this.addPregunta = { ...tempPregunta };
  }

  clearAddPregunta() {
    this.addSectionSubmit = false;
    this.editing_index = -1;
    this.addPregunta = {
      tipo: 'S3',
      crucial: true,
      descripcion: '',
      opciones: [
        {
          opcion:"",
          crucial:true
        }
      ],
    };
  }

  saveQuestion() {
    this.addSectionSubmit = true;
    if (this.validAddPregunta()) {
      if (this.editing_index >= 0) {
        this.form.preguntas[this.editing_index] = { ...this.addPregunta };
        this.clearAddPregunta();
      } else {
        this.form.preguntas.push({ ...this.addPregunta });
        this.clearAddPregunta();
      }
    } else {
      this.validErrorAlert();
    }
  }

  validAddPregunta() {
    return this.addPregunta.descripcion && this.addPregunta && this.validQuestionOptions(this.addPregunta);
  }

  validQuestionOptions(question: Pregunta) {
    if (question.tipo === 'S1' || question.tipo === 'S2') {
      return (
        question.opciones.length &&
        !question.opciones.filter((data) => !data.opcion).length
      );
    }
    return true;
  }

  validInput(value: any) {
    return this.addSectionSubmit && !value;
  }

  printToLetter(number: number): any {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    let charIndex = number % alphabet.length;
    let quotient: any = number / alphabet.length;
    if (charIndex - 1 == -1) {
      charIndex = alphabet.length;
      quotient--;
    }
    result = alphabet.charAt(charIndex - 1) + result;
    if (quotient >= 1) {
      return this.printToLetter(parseInt(quotient));
    } else {
      return result;
    }
  }

  getTipoName(idType: string) {
    return this._type.tipo_pregunta.find(({ id }) => id === idType)?.value;
  }

  getTipoInfo(idType: string) {
    return this._type.tipo_pregunta.find(({ id }) => id === idType)?.info;
  }

  selectedGoUpIndex?: number;
  sectionGoUp(index: number) {
    if (index) {
      this.selectedGoUpIndex = index;
      const previous = { ...this.form.preguntas[index - 1] };
      const first = { ...this.form.preguntas[index] };
      this.form.preguntas[index - 1] = previous;
      this.form.preguntas[index] = first;
      setTimeout(() => {
        this.form.preguntas[index - 1] = first;
        this.form.preguntas[index] = previous;
        this.selectedGoUpIndex = undefined;
      }, 600);
    }
  }

  save(){
    if(this.form_id){
      this.upadte();
    }else{
      this.create();
    }
  }

  create() {
    this.formSubmit = true;
    if (this.form.titulo && this.form.preguntas.length) {
      this._form.create(this.form).subscribe((res) => {
        this._app.sw.alertSuccess('Formulario creado').then(() => {
          this._app.router.navigateByUrl(AppRoutes.platform.forms.route);
        });
      });
    } else {
      this.validErrorAlert();
    }
  }

  upadte() {
    this.formSubmit = true;
    if (this.form.titulo && this.form.preguntas.length) {
      this._form.updateEvaluacion(this.form, this.form_id).subscribe((res) => {
        this._app.sw.alertSuccess('Formulario Actualizado').then(() => {
          this._app.router.navigateByUrl(AppRoutes.platform.forms.route);
        });
      });
    } else {
      this.validErrorAlert();
    }
  }

  validErrorAlert() {
    Swal.fire({
      icon: 'error',
      text: '¡Aún hay campos sin llenar!',
    });
  }

  filterCondition(item: any, term: string) {
    const cond = item.nombre.toUpperCase().indexOf(term.toUpperCase()) > -1;
    return cond;
  }
}
