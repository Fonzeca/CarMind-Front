import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared/shared.module';
import { FormSModule } from '../forms/forms.module';
import { AddDocumentComponent } from './shared/add-document/add-document.component';
import { FormAssignmentComponent } from './shared/form-assignment/form-assignment.component';
import { EditFormVehicleComponent } from './shared/edit-form-vehicle/edit-form-vehicle.component';
import { QrModalComponent } from './shared/qr-modal/qr-modal.component';
import { VehicleCardComponent } from './shared/vehicle-card/vehicle-card.component';
import { VehicleDocumentViewComponent } from './shared/vehicle-document-view/vehicle-document-view.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehiclePreviewComponent } from './vehicle-preview/vehicle-preview.component';
import { VehicleReviewComponent } from './vehicle-review/vehicle-review.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { CreateFormVehicleComponent } from './shared/create-form-vehicle/create-form-vehicle.component';

@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleCardComponent,
    EditFormVehicleComponent,
    CreateFormVehicleComponent,
    VehiclePreviewComponent,
    QrModalComponent,
    VehicleDocumentViewComponent,
    AddDocumentComponent,
    FormAssignmentComponent,
    VehicleReviewComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    QRCodeModule,
    DropdownModule,
    FormSModule,
    CalendarModule,
    NgbModule,
  ],
})
export class VehiclesModule { }
