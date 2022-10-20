import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceDefectDetailsComponent } from './maintenance-defect-details/maintenance-defect-details.component';
import { MaintenanceDefectListComponent } from './maintenance-main/maintenance-defect-list/maintenance-defect-list.component';
import { MaintenanceComponent } from './maintenance.component';


const routes: Routes = [
  {
    path:'',
    component: MaintenanceComponent,
    children:[
      {
        path:'defects',
        component: MaintenanceDefectListComponent
      },
      {
        path:'service'
      }
    ]
  },
  {
    path:'details',
    component: MaintenanceDefectDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
