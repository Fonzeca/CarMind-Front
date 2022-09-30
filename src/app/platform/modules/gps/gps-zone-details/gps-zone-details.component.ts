import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';


@Component({
  selector: 'app-zone-details',
  templateUrl: './gps-zone-details.component.html',
  styleUrls: ['./gps-zone-details.component.scss']
})
export class GpsZoneDetailsComponent extends BaseComponent implements OnInit {

  zoneName: string | undefined;

  constructor(private router: Router) {
    super();
    if (this.router.getCurrentNavigation() === null || this.router.getCurrentNavigation()!.extras.state! === undefined) {
      this.router.navigateByUrl(this.getAppRoutes.platform.gps.zones.route);
    } else {
      this.zoneName = this.router.getCurrentNavigation()!.extras.state!['zoneName'];
    }
   }

  ngOnInit(): void {
  }

}
