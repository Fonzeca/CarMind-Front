import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/routes';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'',
    component:  AuthContainerComponent,
    children:[
      {
        path: AppRoutes.auth.login,
        component: LoginComponent
      },
      {
        path: AppRoutes.auth.change_password,
        component: ChangePassComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
