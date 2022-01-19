import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsComponent } from './forms/forms.component';
import { PersonalComponent } from './personal/personal.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    HomeComponent,
    FormsComponent,
    PersonalComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VehiclesModule { }
