import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpsVehicleDetailsComponent } from './gps-vehicle-details/gps-vehicle-details.component';
import { GpsZoneDetailsComponent } from './gps-zone-details/gps-zone-details.component';
import { GpsComponent } from './gps.component';

const routes: Routes = [
  {
    path:'',
    component: GpsComponent,
    children:[
      {
        path:'vehicles',
        children: [
          {
            path:'details',
            component: GpsVehicleDetailsComponent
          },
        ]
      },
      {
        path:'zones',
        children: [
          {
            path:'details',
            component: GpsZoneDetailsComponent
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GpsRoutingModule { }
