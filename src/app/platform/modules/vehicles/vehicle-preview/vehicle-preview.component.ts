import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { ModalComponent } from 'src/app/platform/components/modal/modal.component';
import { formInterface } from 'src/app/platform/interfaces/form';
import { vehicle } from 'src/app/platform/interfaces/vehicle';
import { vehicleByIdResponse, VehiclesService } from 'src/app/platform/services/vehicles.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';
import { AddDocumentComponent } from '../shared/add-document/add-document.component';
import { FormAssignmentComponent } from '../shared/form-assignment/form-assignment.component';
import { FormVehicleComponent } from '../shared/form-vehicle/form-vehicle.component';
import { QrModalComponent } from '../shared/qr-modal/qr-modal.component';
import { VehicleDocumentViewComponent } from '../shared/vehicle-document-view/vehicle-document-view.component';

@Component({
  selector: 'app-vehicle-preview',
  templateUrl: './vehicle-preview.component.html',
  styleUrls: ['./vehicle-preview.component.scss']
})
export class VehiclePreviewComponent extends BaseComponent implements OnInit {

  flicker: Subject<any> = new Subject();

  vehicle!: vehicle;

  columns:number = 2;
  recentFormsColumns:number = 6;
  recentReviewsColumns:number = 3;

  public vehicleQrCode?: string;

  public forms?: any[] = []; // Formularios
  public recentForms?: any[] = []; // Formularios Recientes
  public recentReviews?: any[] = []; // Revisiones Recientes

  slideIndex: number = 0;
  slideCant: number = 4;

  constructor(public _vehicle: VehiclesService,  public activatedRoute:ActivatedRoute, public dialog: MatDialog) {
    super()
  }

  ngOnInit(): void {
    this.addSafeSubscription(
      this.activatedRoute.params.subscribe((param:Params)=>{
        if(param["id"]){
          this.getById(param["id"]);
        }
      })
    );
  }

  getById(id:number){
    this.addSafeSubscription(
      this._vehicle.getById(id).subscribe((data:vehicleByIdResponse)=>{
        this.vehicle = data.vehicle;
        this.vehicle.documentos = data.documents;
        this.recentForms = data.recentForms;
        this.forms = data.forms;
        this.recentReviews = data.recentReviews;
        this.vehicleQrCode = `CarMind-vehiculo=${this.vehicle.id}-CarMind`;
      })
    );
  }

  qrCode() {
    this.dialog.open(ModalComponent, {
      width: '280px;',
      height: 'auto',
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {
        viewComponent: {
          component: QrModalComponent,
          data: {
            qr: this.vehicleQrCode
          },
        },
        title: 'QR del Vehículo',
      },
    }).afterClosed().subscribe(res=> this.getById(this.vehicle.id));
  }

  editVehicle() {
    this.dialog.open(ModalComponent, {
      width: '635px;',
      height: 'auto',
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {
        viewComponent: {
          component: FormVehicleComponent,
          data: {...this.vehicle},
        },
        title: 'Editar Vehículo',
      },
    }).afterClosed().subscribe(res=> this.getById(this.vehicle.id));
  }

  addDocument(id:number) {
    this.dialog.open(ModalComponent, {
      width: '700px',
      height: 'auto',
      panelClass: ['md:w-5/5', 'w-full'],
      data: {
        viewComponent: {
          component: AddDocumentComponent,
          data: {
            id
          },
        },
        title: 'Adjuntar Documento',
      },
    });
  }

  verDocument(id:number,tipo:string) {
    this.dialog.open(ModalComponent, {
      width: '700px',
      height: 'auto',
      panelClass: ['md:w-5/5', 'w-full'],
      data: {
        viewComponent: {
          component: VehicleDocumentViewComponent,
          data: {
            id,
            tipo
          },
        },
        title: 'Ver documento',
      },
    })
  }

  formAssignment() {
    this.dialog.open(ModalComponent, {
      width: '700px',
      height: 'auto',
      panelClass: ['md:w-5/5', 'w-full'],
      data: {
        viewComponent: {
          component: FormAssignmentComponent,
          data: {
            id: this.vehicle.id,
            close: () => this.dialog.closeAll(),
          },
        },
        title: 'Asignar formulario',
      },
    })
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
}
