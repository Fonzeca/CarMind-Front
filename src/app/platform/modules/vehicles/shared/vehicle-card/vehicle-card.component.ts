import { Component, Input, OnInit } from '@angular/core';
import { vehicle } from 'src/app/platform/interfaces/vehicle';

@Component({
  selector: 'm-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss']
})
export class VehicleCardComponent implements OnInit {

  @Input() vehicle!:vehicle;

  constructor() { }

  ngOnInit(): void { }

}
