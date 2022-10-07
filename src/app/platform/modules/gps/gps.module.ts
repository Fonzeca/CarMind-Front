import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpsRoutingModule } from './gps-routing.module';
import { GpsComponent } from './gps.component';
import { GpsVehicleDetailsComponent } from './gps-vehicle-details/gps-vehicle-details.component';
import { GpsMapComponent } from './gps-map/gps-map.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { GpsVehicleListComponent } from './gps-vehicle-list/gps-vehicle-list.component';
import { GpsZoneComponent } from './gps-zone-list/gps-zone-list.component';
import { GpsZoneDetailsComponent } from './gps-zone-details/gps-zone-details.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';


@Injectable()
export class DefaultIntl extends OwlDateTimeIntl  {
  /** A label for the up second button (used by screen readers).  */
  override upSecondLabel = 'Add a second';

  /** A label for the down second button (used by screen readers).  */
  override downSecondLabel= 'Minus a second';

  /** A label for the up minute button (used by screen readers).  */
  override upMinuteLabel= 'Add a minute';

  /** A label for the down minute button (used by screen readers).  */
  override downMinuteLabel= 'Minus a minute';

  /** A label for the up hour button (used by screen readers).  */
  override upHourLabel= 'Add a hour';

  /** A label for the down hour button (used by screen readers).  */
  override downHourLabel= 'Minus a hour';

  /** A label for the previous month button (used by screen readers). */
  override prevMonthLabel= 'Previous month';

  /** A label for the next month button (used by screen readers). */
  override nextMonthLabel= 'Next month';

  /** A label for the previous year button (used by screen readers). */
  override prevYearLabel= 'Previous year';

  /** A label for the next year button (used by screen readers). */
  override nextYearLabel= 'Next year';

  /** A label for the previous multi-year button (used by screen readers). */
  override prevMultiYearLabel= 'Previous 21 years';

  /** A label for the next multi-year button (used by screen readers). */
  override nextMultiYearLabel= 'Next 21 years';

  /** A label for the 'switch to month view' button (used by screen readers). */
  override switchToMonthViewLabel= 'Change to month view';

  /** A label for the 'switch to year view' button (used by screen readers). */
  override switchToMultiYearViewLabel= 'Choose month and year';

  /** A label for the cancel button */
  override cancelBtnLabel= 'Cancelar';

  /** A label for the set button */
  override setBtnLabel= 'Ok';

  /** A label for the range 'from' in picker info */
  override rangeFromLabel= 'Desde';

  /** A label for the range 'to' in picker info */
  override rangeToLabel= 'Hasta';

  /** A label for the hour12 button (AM) */
  override hour12AMLabel= 'AM';

  /** A label for the hour12 button (PM) */
  override hour12PMLabel= 'PM';
}


@NgModule({
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'},
    {provide: OwlDateTimeIntl, useClass: DefaultIntl},
    
  ],
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
    MatSlideToggleModule,
    ColorPickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class GpsModule { }

