import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-gps-list',
  templateUrl: './gps-list.component.html',
  styleUrls: ['./gps-list.component.scss']
})
export class GpsListComponent extends BaseComponent implements OnInit {

  constructor(public router:Router) {
    super();
   }

  ngOnInit(): void {
  }

  detail(){
    this.router.navigateByUrl(this.getAppRoutes.platform.gps.details.route)
  }

}
