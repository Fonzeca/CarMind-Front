import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormListComponent } from './form-list/form-list.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCardComponent } from './shared/form-card/form-card.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    FormListComponent,
    FormCardComponent,
    CreateFormComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule
  ]
})
export class FormSModule { }
