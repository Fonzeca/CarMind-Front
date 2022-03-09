import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/routes';

const routes: Routes = [
  {
    path: AppRoutes.platform.vehicles.main,
    loadChildren:() => import('./vehicles/vehicles.module').then(m=> m.VehiclesModule)
  },
  {
    path: AppRoutes.platform.my_account.main,
    loadChildren:() => import('./my-account/my-account.module').then(m=> m.MyAccountModule)
  },
  {
    path: AppRoutes.platform.users.main,
    loadChildren:() => import('./users/users.module').then(m=> m.UsersModule)
  },
  {
    path: AppRoutes.platform.forms.main,
    loadChildren:() => import('./forms/forms.module').then(m=> m.FormSModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
