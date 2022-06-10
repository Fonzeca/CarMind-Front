import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePassComponent } from './change-pass/change-pass.component';


@NgModule({
  declarations: [
    LoginComponent,
    AuthContainerComponent,
    ChangePassComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
