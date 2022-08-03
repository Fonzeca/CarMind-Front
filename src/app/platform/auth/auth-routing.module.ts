import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/routes';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { EnterCodeComponent } from './enter-code/enter-code.component';
import { EnterEmailComponent } from './enter-email/enter-email.component';
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
      },
      {
        path: AppRoutes.auth.enter_email,
        component: EnterEmailComponent
      },
      {
        path: AppRoutes.auth.enter_code,
        component: EnterCodeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
