import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpsDetailsComponent } from './gps-details/gps-details.component';
import { GpsListComponent } from './gps-list/gps-list.component';
import { GpsComponent } from './gps.component';

const routes: Routes = [
  {
    path:'',
    component: GpsComponent,
    children:[
      {
        path:'',
        component: GpsListComponent
      },
      {
        path:'details',
        component: GpsDetailsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GpsRoutingModule { }
