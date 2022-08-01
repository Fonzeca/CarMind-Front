import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/routes';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { DialogEntryComponent } from './vehicle-preview/dialog-entry.component';
import { VehiclePreviewComponent } from './vehicle-preview/vehicle-preview.component';
import { VehicleReviewComponent } from './vehicle-review/vehicle-review.component';

const routes: Routes = [
  {
    path:'',
    component: VehicleListComponent
  },
  {
    path:':id',
    component: VehiclePreviewComponent,
    children:[
      {
        path: 'evaluation/:id',
        component: DialogEntryComponent
      }
    ]
  },
  {
    path: AppRoutes.platform.vehicles.review.main,
    component: VehicleReviewComponent
  },
  {
    path: AppRoutes.platform.vehicles.review.view.main,
    component: VehicleReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
