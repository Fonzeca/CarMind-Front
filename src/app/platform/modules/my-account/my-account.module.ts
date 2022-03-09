import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    FormsModule,
    DirectivesModule
  ]
})
export class MyAccountModule { }
