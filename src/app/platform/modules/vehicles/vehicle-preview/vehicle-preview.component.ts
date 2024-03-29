import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ModalComponent } from 'src/app/platform/components/modal/modal.component';
import { formInterface } from 'src/app/platform/interfaces/form';
import { vehicle } from 'src/app/platform/interfaces/vehicle';
import { AppService } from 'src/app/platform/services/core/app.service';
import { vehicleByIdResponse, VehiclesService } from 'src/app/platform/services/vehicles.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';
import { AppRoutes } from 'src/app/routes';
import Swal from 'sweetalert2';
import { AddDocumentComponent } from '../shared/add-document/add-document.component';
import { EditFormVehicleComponent } from '../shared/edit-form-vehicle/edit-form-vehicle.component';
import { FormAssignmentComponent } from '../shared/form-assignment/form-assignment.component';
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
  recentFormsColumns:number = 7;
  recentReviewsColumns:number = 3;

  public vehicleQrCode?: string;

  public forms?: any[] = []; // Formularios
  public recentForms?: any[] = []; // Formularios Recientes
  public recentReviews?: any[] = []; // Revisiones Recientes

  slideIndex: number = 0;
  slideCant: number = 4;

  constructor(public _vehicle: VehiclesService,  public activatedRoute:ActivatedRoute, public dialog: MatDialog, public _app: AppService, private _router : Router) {
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
          component: EditFormVehicleComponent,
          data: {...this.vehicle},
        },
        title: 'Editar Vehículo',
      },
    }).afterClosed().subscribe(res=> this.getById(this.vehicle.id));
  }

  editPhoto(){

  }

  deleteVehicle() {
    Swal.fire({
      title: '¿Estás seguro que querés eliminar este vehículo?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      text: 'Se borrará el historial de este vehículo y la documentación adjuntada.',
      customClass: {
        actions: 'my-actions',
        confirmButton: "btn btn-success m-btn-succes",
        cancelButton: 'order-1 right-gap',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this._vehicle.deleteVehicle(this.vehicle.id.toString()).subscribe((res) => {
          this._app.sw.alertSuccess('Vehículo eliminado').then(() => {
            this._app.router.navigateByUrl(AppRoutes.platform.vehicles.route);
          });
        });
      }
    })
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
            vehicleForms: this.forms,
            id: this.vehicle.id,
            close: () => this.dialog.closeAll(),
          },
        },
        title: 'Asignar formulario',
      },
    })
  }

  edit(form:any){
    let url = '/'.concat(this.getAppRoutes.platform.forms.update.route(form.id));
    this._router.navigateByUrl(url);
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
