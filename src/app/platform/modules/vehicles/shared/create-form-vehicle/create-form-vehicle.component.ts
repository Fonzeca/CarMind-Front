import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { dyComponent } from 'src/app/platform/components/modal/modal.component';
import { AppService } from 'src/app/platform/services/core/app.service';
import { TypeService } from 'src/app/platform/services/type.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';

@Component({
  selector: 'm-form-vehicle',
  templateUrl: './create-form-vehicle.component.html',
  styleUrls: ['./create-form-vehicle.component.scss']
})
export class CreateFormVehicleComponent implements dyComponent {

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
  data: any;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        "nombre" : [ '' ,Validators.required],
        "patente" : ["N/A" ],
        "tipo" : [this.type.tipo_vehiculo[0],Validators.required],
    });
  }

  action(){
    this.create(this.form);
  }

  create(form:any){
    if(!form.invalid){
      const { value:data } = form;
      if (data["patente"].length <= 0 || data["patente"] == "N/A") data["patente"] = null
      this._vehicle.create(data).subscribe(
        res=>{
          this.close()
          this._app.sw.alertSuccess("Vehículo guardado");
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
