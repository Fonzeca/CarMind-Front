import { Component, Input, OnInit } from '@angular/core';
import { vehicle } from 'src/app/platform/interfaces/vehicle';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-gps-details',
  templateUrl: './gps-details.component.html',
  styleUrls: ['./gps-details.component.scss']
})
export class GpsDetailsComponent extends BaseComponent implements OnInit {

  @Input() vehicle!:vehicle;

  constructor() {
    super();
   }

  ngOnInit(): void {
  }

}
