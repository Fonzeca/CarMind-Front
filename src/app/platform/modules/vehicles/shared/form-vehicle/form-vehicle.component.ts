import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { dyComponent } from 'src/app/platform/components/modal/modal.component';
import { AppService } from 'src/app/platform/services/core/app.service';
import { TypeService } from 'src/app/platform/services/type.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';

@Component({
  selector: 'm-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
})
export class FormVehicleComponent implements dyComponent {

  @Input() data:any;

  form!: FormGroup;
  constructor(
    private dialogRef: MatDialog,
    private formBuilder:FormBuilder,
    private _vehicle:VehiclesService,
    private _app:AppService,
    public type:TypeService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        "nombre" : [ this.data?.nombre ? this.data.nombre : '' ,Validators.required],
        "marca" : [this.data?.marca ? this.data.marca : '',Validators.required],
        "modelo" : [this.data?.modelo ? this.data.modelo : '',Validators.required],
        "linea" : [this.data?.linea ? this.data.linea : '',Validators.required],
        "patente" : [this.data?.patente ? this.data.patente : '',Validators.required],
        "tipo" : [ this.data?.tipo ? this.data.tipo : this.type.tipo_vehiculo[0],Validators.required]
    });
    Object.keys(this.form.controls).forEach(key=>{
      if(this.data.hasOwnProperty(key)){
        this.form.controls['id'].setValue(this.data[key]);
      }
    });
  }

  action(){
    if(this.data.id){
      this.update(this.form);
    }else{
      this.create(this.form);
    }
  }

  create(form:any){
    if(!form.invalid){
      const { value:data } = form;
      this._vehicle.create(data).subscribe(
        res=>{
          this.close()
          this._app.sw.alertSuccess("Vehículo guardado");
        }
      )
    }
  }

  update(form:any){
    if(!form.invalid){
      const { value:data } = form;
      data.id = this.data.id;
      this._vehicle.update(data).subscribe(
        res=>{
          this.close()
          this._app.sw.alertSuccess("Vehículo actualizado");
        }
      )
    }
  }

  getControl(control:string) : AbstractControl {
    return this.form.controls[control];
  }


  close(){
      this.dialogRef.closeAll();
  }

}
