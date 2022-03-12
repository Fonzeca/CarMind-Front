import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleCardComponent } from './shared/vehicle-card/vehicle-card.component';
import { ComponentsModule } from '../../components/components.module';
import { FormVehicleComponent } from './shared/form-vehicle/form-vehicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { VehiclePreviewComponent } from './vehicle-preview/vehicle-preview.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QrModalComponent } from './shared/qr-modal/qr-modal.component';
import { VehicleDocumentViewComponent } from './shared/vehicle-document-view/vehicle-document-view.component';
import { AddDocumentComponent } from './shared/add-document/add-document.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormAssignmentComponent } from './shared/form-assignment/form-assignment.component';

@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleCardComponent,
    FormVehicleComponent,
    VehiclePreviewComponent,
    QrModalComponent,
    VehicleDocumentViewComponent,
    AddDocumentComponent,
    FormAssignmentComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    QRCodeModule,
    DropdownModule
  ],
})
export class VehiclesModule { }
