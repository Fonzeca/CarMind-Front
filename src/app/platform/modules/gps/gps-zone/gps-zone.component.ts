import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ZoneView } from 'src/app/platform/interfaces/gps_data';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-zone',
  templateUrl: './gps-zone.component.html',
  styleUrls: ['./gps-zone.component.scss']
})
export class GpsZoneComponent extends BaseComponent implements OnInit {

  zones: ZoneView[] = [];
  searchText = '';
  itemSelected = -1;

  editing_id = '';
  @ViewChild('editing') input!: ElementRef;

  constructor(public router:Router) {
    super();
    var newZone : ZoneView = {
      name: "hola",
      id: 1
    };

    this.zones.push(newZone);
  }

  ngOnInit(): void {
  }

  addZone(id: string) {
    this.editing_id = id;
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 0);
  }

  saveZone(input: any) {
    const property = this.editing_id;
    const value = input.value;
    let data: any = {};
    data[property] = value;
    this.editing_id = '';
    this.router.navigate([this.getAppRoutes.platform.gps.zones.details.route], {state:{zoneName: data['zoneName']}});
  }

}
