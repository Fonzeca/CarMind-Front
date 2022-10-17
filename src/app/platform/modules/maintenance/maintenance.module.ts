import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceDefectListComponent } from './maintenance-defect-list/maintenance-defect-list.component';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'primeng/api';
import { FormSModule } from '../forms/forms.module';
import { CalendarModule } from 'primeng/calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    MaintenanceDefectListComponent,
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    Ng2SearchPipeModule,

    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
  ]
})
export class MaintenanceModule { }
