import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormListComponent } from './form-list/form-list.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCardComponent } from './shared/form-card/form-card.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { DropdownModule } from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ViewFormModalComponent } from './shared/view-form-modal/view-form-modal.component';

@NgModule({
  declarations: [
    FormListComponent,
    FormCardComponent,
    CreateFormComponent,
    ViewFormModalComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule,
    InputSwitchModule
  ],
  exports:[FormCardComponent, ViewFormModalComponent]
})
export class FormSModule { }
