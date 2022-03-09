import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { UserFormComponent } from './shared/user-form/user-form.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UsersModule { }
