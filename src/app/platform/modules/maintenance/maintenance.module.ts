import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceDefectListComponent } from './maintenance-main/maintenance-defect-list/maintenance-defect-list.component';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../../shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MaintenanceDefectDetailsComponent } from './maintenance-defect-details/maintenance-defect-details.component';
import { MaintenanceMainComponent } from './maintenance-main/maintenance-main.component';
import { ImageCardComponent } from './maintenance-defect-details/image-card/image-card.component';
import { CommentCardComponent } from './maintenance-defect-details/comment-card/comment-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    MaintenanceComponent,
    MaintenanceMainComponent,
    MaintenanceDefectListComponent,
    MaintenanceDefectDetailsComponent,
    ImageCardComponent,
    CommentCardComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    Ng2SearchPipeModule,
    SharedModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    MatSortModule,
    NgbModule
  ]
})
export class MaintenanceModule { }
