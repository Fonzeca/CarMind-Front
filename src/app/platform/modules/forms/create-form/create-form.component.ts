import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {
  FormCreate,
  Opciones,
  Pregunta,
  Seccion
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

  addSection!: Seccion;

  addSectionSubmit = false;
  formSubmit = false;

  form: FormCreate = {
    titulo: '',
    fecha_inicio: '',
    secciones: [],
  };

  editTitle = false;

  editing_index: any;

  constructor(
    public _type: TypeService,
    public _form: FormsService,
    public _app: AppService
  ) {}

  ngOnInit(): void {
    this.clearAddSecction();
  }

  get preguntas(): Pregunta[] {
    return this.addSection?.preguntas ? this.addSection?.preguntas : [];
  }

  addQuestion(i: number) {
    this.addSection.preguntas?.splice(i + 1, 0, {
      tipo: 'S3',
      crucial: false,
      descripcion: '',
      opciones: [
        {
          opcion:"",
          crucial:false
        }
      ],
    });

    setTimeout(() => this.focusElement(i+1), 0);
  }

  focusElement(index: number) {
    const input = this.inputs.find((x, i) => i == index);
    debugger
    if (input) input.nativeElement.focus();
  }

  removeSection(i: number) {
    this.form.secciones?.splice(i, 1);
  }

  removeQuestion(i: number, preguntas: Pregunta[] = this.addSection.preguntas) {
    preguntas?.splice(i, 1);
  }

  addOption(question: Pregunta, i: number) {
    question.opciones.splice(i + 1, 0,  {
      opcion:"",
      crucial:false
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

  editSection(i: number, section: Seccion) {
    this.editing_index = i;
    const tempSection = { ...section };
    this.addSection = { ...tempSection };
  }

  clearAddSecction() {
    this.addSectionSubmit = false;
    this.editing_index = -1;
    this.addSection = {
      nombre: '',
      preguntas: [
        {
          tipo: 'S3',
          crucial: false,
          descripcion: '',
          opciones: [
            {
              opcion:"",
              crucial:false
            }
          ],
        },
      ],
    };
  }

  saveSection() {
    this.addSectionSubmit = true;
    if (this.validAddSection()) {
      if (this.editing_index >= 0) {
        this.form.secciones[this.editing_index] = { ...this.addSection };
        this.clearAddSecction();
      } else {
        this.form.secciones.push({ ...this.addSection });
        this.clearAddSecction();
      }
    } else {
      this.validErrorAlert();
    }
  }

  validAddSection() {
    const validQ = !this.addSection.preguntas.filter(
      (question) =>
        !question.tipo ||
        !question.descripcion ||
        !this.validQuestionOptions(question)
    ).length;
    return this.addSection.nombre && this.addSection.preguntas.length && validQ;
  }

  validQuestionOptions(question: Pregunta) {
    if (question.tipo === 'S1' || question.tipo === 'S2') {
      return (
        question.opciones.length &&
        !question.opciones.filter((data) => !data).length
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

  selectedGoUpIndex?: number;
  sectionGoUp(index: number) {
    if (index) {
      this.selectedGoUpIndex = index;
      const previous = { ...this.form.secciones[index - 1] };
      const first = { ...this.form.secciones[index] };
      this.form.secciones[index - 1] = previous;
      this.form.secciones[index] = first;
      setTimeout(() => {
        this.form.secciones[index - 1] = first;
        this.form.secciones[index] = previous;
        this.selectedGoUpIndex = undefined;
      }, 600);
    }
  }
  create() {
    this.formSubmit = true;
    if (this.form.titulo && this.form.secciones.length) {
      this._form.create(this.form).subscribe((res) => {
        this._app.sw.alertSuccess('Formulario creado').then(() => {
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
