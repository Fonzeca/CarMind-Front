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

@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleCardComponent,
    FormVehicleComponent,
    VehiclePreviewComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class VehiclesModule { }
