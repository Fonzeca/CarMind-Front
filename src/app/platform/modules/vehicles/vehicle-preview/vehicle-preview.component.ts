import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'src/app/platform/components/modal/modal.component';
import { vehicle } from 'src/app/platform/interfaces/vehicle';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';
import { FormVehicleComponent } from '../shared/form-vehicle/form-vehicle.component';

@Component({
  selector: 'app-vehicle-preview',
  templateUrl: './vehicle-preview.component.html',
  styleUrls: ['./vehicle-preview.component.scss']
})
export class VehiclePreviewComponent implements OnInit {

  vehicle!: vehicle;

  constructor(public _vehicle: VehiclesService,  public activatedRoute:ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param:Params)=>{
      if(param["id"]){
        this.getById(param["id"]);
      }
    });
  }
  getById(id:number){
    this._vehicle.getById(id).subscribe((data:vehicle)=> this.vehicle = data);
  }
  editVehicle() {
    this.dialog.open(ModalComponent, {
      width: '635px;',
      height: 'auto',
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {
        viewComponent: {
          component: FormVehicleComponent,
          data: {...this.vehicle},
        },
        title: 'Editar Vehículo',
      },
    }).afterClosed().subscribe(res=> this.getById(this.vehicle.id));
  }

}
