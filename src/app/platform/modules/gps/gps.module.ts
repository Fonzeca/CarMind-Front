import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpsRoutingModule } from './gps-routing.module';
import { GpsComponent } from './gps.component';
import { GpsVehicleDetailsComponent } from './gps-vehicle-details/gps-vehicle-details.component';
import { GpsMapComponent } from './gps-map/gps-map.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { GpsVehicleListComponent } from './gps-vehicle-list/gps-vehicle-list.component';
import { GpsZoneComponent } from './gps-zone/gps-zone.component';
import { GpsZoneDetailsComponent } from './gps-zone-details/gps-zone-details.component';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    GpsComponent,
    GpsVehicleDetailsComponent,
    GpsMapComponent,
    GpsVehicleListComponent,
    GpsZoneComponent,
    GpsZoneDetailsComponent,
  ],
  imports: [
    CommonModule,
    GpsRoutingModule,
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatSlideToggleModule
  ]
})
export class GpsModule { }
