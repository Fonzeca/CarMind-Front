import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceDefectListComponent } from './maintenance-defect-list/maintenance-defect-list.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
