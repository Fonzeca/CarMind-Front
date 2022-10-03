import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { VehicleView } from 'src/app/platform/interfaces/gps_data';
import { vehicle } from 'src/app/platform/interfaces/vehicle';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';


@Component({
  selector: 'app-zone-details',
  templateUrl: './gps-zone-details.component.html',
  styleUrls: ['./gps-zone-details.component.scss']
})
export class GpsZoneDetailsComponent extends BaseComponent implements OnInit {

  isAddingPoints: boolean = true;

  zoneName: string | undefined;

  vehicles : VehicleView[] = []

  checked : boolean = false;
  color: ThemePalette = 'primary'


  constructor(private router: Router) {
    super();
    if (this.router.getCurrentNavigation() === null || this.router.getCurrentNavigation()!.extras.state! === undefined) {
      this.router.navigateByUrl(this.getAppRoutes.platform.gps.zones.route);
    } else {
      this.zoneName = this.router.getCurrentNavigation()!.extras.state!['zoneName'];
    }

    this.vehicles.push({nombre: "el 1", patente: "asd-as"})

   }

  ngOnInit(): void {
  }

  endPoints(){
    this.isAddingPoints = false;
  }

  onChange(newValue : boolean, oldValue : boolean){

  }

}
