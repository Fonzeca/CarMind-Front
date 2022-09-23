import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { dyComponent } from 'src/app/platform/components/modal/modal.component';
import { AppService } from 'src/app/platform/services/core/app.service';
import { TypeService } from 'src/app/platform/services/type.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';

@Component({
  selector: 'm-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.scss']
})
export class FormVehicleComponent implements dyComponent {

  @Input() data:any;

  _tipo:string = "Auto";
  set tipo (value:any){
    this._tipo = value;
    this.form.patchValue({
      tipo: value
    });
  }
  get tipo(){
    return this._tipo;
  }


  form!: FormGroup;
  constructor(
    private dialogRef: MatDialog,
    private formBuilder:FormBuilder,
    private _vehicle:VehiclesService,
    public _app:AppService,
    public type:TypeService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        "nombre" : [ this.data?.nombre ? this.data.nombre : '' ,Validators.required],
        "marca" : [this.data?.marca ? this.data.marca : '',Validators.required],
        "modelo" : [this.data?.modelo ? this.data.modelo : '',Validators.required],
        "linea" : [this.data?.linea ? this.data.linea : '',Validators.required],
        "patente" : [this.data?.patente ? this.data.patente : "N/A" ],
        "tipo" : [ this.data?.tipo ? this.data.tipo : this.type.tipo_vehiculo[0],Validators.required],
        "kilometraje" : [ this.data?.kilometraje ? this.data.kilometraje : '', Validators.required],
        "imei" : [ this.data?.imei ? this.data.imei :  "N/A"],
    });
  }

  action(){
    if(this.data?.id){
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
      if (data["imei"].length <= 0) data["imei"] = null
      if (data["patente"].length <= 0) data["patente"] = null
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

  quitarAcentos(cadena:string){
    const acentos:any = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();
  }
}
