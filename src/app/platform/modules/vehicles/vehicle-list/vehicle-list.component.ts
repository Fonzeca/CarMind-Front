import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/platform/components/modal/modal.component';
import { vehicle } from 'src/app/platform/interfaces/vehicle';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';
import { FormVehicleComponent } from '../shared/form-vehicle/form-vehicle.component';

@Component({
  selector: 'm-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {

  vehicles: vehicle[] = [];
  filterInput: string = '';

  constructor(public _vehicle: VehiclesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getVehicle();
  }

  getVehicle() {
    this._vehicle.getAll$.subscribe((res) => {
      this.vehicles = res;
    })
    this._vehicle.getAll().subscribe();
  }

  openDialog() {
    this.dialog.open(ModalComponent, {
      width: '635px;',
      height: 'auto',
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {
        viewComponent: {
          component: FormVehicleComponent,
          data: {  },
        },
        title: 'Nuevo Vehículo',
      },
    });
  }
}
