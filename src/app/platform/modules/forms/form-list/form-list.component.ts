import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { ModalComponent } from 'src/app/platform/components/modal/modal.component';
import { evaluation } from 'src/app/platform/interfaces/evaluation';
import { formInterface } from 'src/app/platform/interfaces/form';
import { FormsService } from 'src/app/platform/services/forms.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';
import { FormTitleComponent } from '../shared/form-title/form-title.component';
import { ViewFormModalComponent } from '../shared/view-form-modal/view-form-modal.component';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
})
export class FormListComponent extends BaseComponent implements OnInit {

  flicker: Subject<any> = new Subject();

  filterInput: string = '';

  columns = 7;

  default: any = {
    nombre_evaluacion: '-',
    fecha: '-',
    nombre_vehiculo: '-',
    nombre_usuario: '-',
  };

  formDefault: any = {
    titulo: '-'
  };

  evaluationHistory!: Observable<evaluation[]>;
  allForms!: Observable<formInterface[]>;

  slideIndex: number = 0;
  slideCant: number = 4;

  constructor(public _forms: FormsService, public dialog: MatDialog,
    public router:Router) {
    super();
  }

  ngOnInit(): void {
    this.addSafeSubscription(
      forkJoin({
        getForms: this._forms.getAllForms(),
        getHistory: this._forms.getHistory(),
      }).subscribe(({ getForms, getHistory }) => {
        this.evaluationHistory = getHistory.getHistory$;
        this.allForms = getForms.getAllForms$;
      })
    );
  }

  getFormSlider(forms: formInterface[]) {
    return forms.slice(this.slideIndex, this.slideIndex + this.slideCant);
  }

  nextSlide(forms: formInterface[]) {
    if ((this.slideIndex+this.slideCant) !== forms.length &&  forms.length!==1) {
      this.slideIndex++;
      this.flikear();
    }
  }

  previousSlide(forms: formInterface[]) {
    if (this.slideIndex !== 0) {
      this.slideIndex--;
      this.flikear();
    }
  }

  flikear() {
    setTimeout(() => this.flicker.next(null), 0);
  }

  filterCondition(item:any, term:string){
    const cond = (
      item.nombre_evaluacion.toUpperCase().indexOf(term.toUpperCase()) > -1 ||
      item.fecha_inicio.toUpperCase().indexOf(term.toUpperCase()) > -1
    );
    return cond;
  }

  filterConditionForm(item:any, term:string){
    this.slideIndex = 0;
    const cond = (
      item.titulo.toUpperCase().indexOf(term.toUpperCase()) > -1
    );
    return cond;
  }


  viewForm(id:number|string) {
    this.dialog.open(ModalComponent, {
      width: '280px;',
      height: 'auto',
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {
        viewComponent: {
          component: ViewFormModalComponent,
          data: {
            id,
            close: () => this.dialog.closeAll(),
          },
        },
        title: 'Formulario',
      },
    }).afterClosed();
  }


  create(){
    this.dialog.open(ModalComponent, {
      width: '280px;',
      height: 'auto',
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {
        viewComponent: {
          component: FormTitleComponent,
          data: {
            close: (title:string) => {
              this.router.navigateByUrl('/'.concat(this.getAppRoutes.platform.forms.createId.route.replace(":id", title)));
              this.dialog.closeAll();
            },
          },
        },
        title: 'Formulario',
      },
    }).afterClosed();
  }
}
