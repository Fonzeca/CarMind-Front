import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../routes';
import { AuthGuardService } from './guards/auth-guard.service';
import { TemplateContainerComponent } from './template/container/container.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo: AppRoutes.platform.vehicles.route
  },
  {
    path:'',
    loadChildren:  () => import('./auth/auth.module').then(m=> m.AuthModule)
  },
  {
    path: AppRoutes.platform.route,
    canActivate: [AuthGuardService],
    component: TemplateContainerComponent,
    loadChildren:  () => import('./modules/modules.module').then(m=> m.ModulesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
