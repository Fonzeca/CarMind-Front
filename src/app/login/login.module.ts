import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginCarrouselComponent } from './login-carrousel/login-carrousel.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    LoginCarrouselComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
