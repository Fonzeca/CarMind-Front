import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpsVehicleDetailsComponent } from './gps-vehicle-details/gps-vehicle-details.component';
import { GpsVehicleListComponent } from './gps-vehicle-list/gps-vehicle-list.component';
import { GpsZoneDetailsComponent } from './gps-zone-details/gps-zone-details.component';
import { GpsZoneComponent } from './gps-zone/gps-zone.component';
import { GpsComponent } from './gps.component';

const routes: Routes = [
  {
    path:'',
    component: GpsComponent,
    children:[
      {
        path:'vehicles',
        component: GpsVehicleListComponent,
        children: [
          {
            path:'details',
            component: GpsVehicleDetailsComponent
          },
        ]
      },
      {
        path:'zones',
        component: GpsZoneComponent,
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
