import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpsRoutingModule } from './gps-routing.module';
import { GpsComponent } from './gps.component';
import { GpsListComponent } from './gps-list/gps-list.component';
import { GpsDetailsComponent } from './gps-details/gps-details.component';
import { GpsMapComponent } from './gps-map/gps-map.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    GpsComponent,
    GpsListComponent,
    GpsDetailsComponent,
    GpsMapComponent
  ],
  imports: [
    CommonModule,
    GpsRoutingModule,
    NgbModule
  ]
})
export class GpsModule { }
