import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceDefectListComponent } from './maintenance-defect-list/maintenance-defect-list.component';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../../shared/shared.module';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    MaintenanceDefectListComponent,
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    Ng2SearchPipeModule,
    SharedModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    MatSortModule

  ]
})
export class MaintenanceModule { }
