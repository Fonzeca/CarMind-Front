import { Component, Input, OnInit } from '@angular/core';
import { vehicle } from 'src/app/platform/interfaces/vehicle';

@Component({
  selector: 'app-gps-details',
  templateUrl: './gps-details.component.html',
  styleUrls: ['./gps-details.component.scss']
})
export class GpsDetailsComponent implements OnInit {

  @Input() vehicle!:vehicle;

  constructor() { }

  ngOnInit(): void {
  }

}
