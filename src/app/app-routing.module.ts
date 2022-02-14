import { PerfilComponent } from './content/perfil/perfil.component';
import { PersonalComponent } from './content/personal/personal.component';
import { DetalleVehiculeComponent } from './content/detalle-vehicule/detalle-vehicule.component';
import { VehicleComponent } from './content/vehicle/vehicle.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login/login-form/login-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'home',
    component: VehicleComponent
  },

  {
    path: 'vehicle',
    component: DetalleVehiculeComponent
  },
  {
    path: 'personal',
    component: PersonalComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
