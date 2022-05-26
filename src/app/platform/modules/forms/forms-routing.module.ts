import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/routes';
import { CreateFormComponent } from './create-form/create-form.component';
import { FormListComponent } from './form-list/form-list.component';

const routes: Routes = [
  {
    path: '',
    component: FormListComponent
  },
  {
    path: AppRoutes.platform.forms.create.main,
    component: CreateFormComponent
  },
  {
    path: AppRoutes.platform.forms.createId.main,
    component: CreateFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
