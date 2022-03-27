import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/routes';
import { VehicileReviewComponent } from './vehicile-review/vehicile-review.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehiclePreviewComponent } from './vehicle-preview/vehicle-preview.component';

const routes: Routes = [
  {
    path:'',
    component: VehicleListComponent
  },
  {
    path:':id',
    component: VehiclePreviewComponent
  },
  {
    path: AppRoutes.platform.vehicles.review.main,
    component: VehicileReviewComponent
  },
  {
    path: AppRoutes.platform.vehicles.review.view.main,
    component: VehicileReviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
