import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { dyComponent } from 'src/app/platform/components/modal/modal.component';
import { AppService } from 'src/app/platform/services/core/app.service';
import { TypeService } from 'src/app/platform/services/type.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';

@Component({
  selector: 'm-form-vehicle',
  templateUrl: './edit-form-vehicle.component.html',
  styleUrls: ['./edit-form-vehicle.component.scss']
})
export class EditFormVehicleComponent implements dyComponent {

  @Input() data:any;

  _tipo:string = "Auto";
  set tipo (value:any){
    this._tipo = value;

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
      "marca" : [this.data?.marca ? this.data.marca : "N/A"],
      "modelo" : [this.data?.modelo ? this.data.modelo : "N/A"],
      "linea" : [this.data?.linea ? this.data.linea : "N/A"],
      "patente" : [this.data?.patente ? this.data.patente : "N/A", Validators.maxLength(20) ],
      "tipo" : [ this.data.tipo,Validators.required],
      "kilometraje" : [ this.data?.kilometraje == 0 ? 0 : this.data?.kilometraje ? this.data.kilometraje : "N/A"],
      "imei" : [ this.data?.imei ? this.data.imei :  "N/A", Validators.maxLength(16)],
    });
    
    var typeindex = this.type.tipo_vehiculo.indexOf(this.data.tipo);
    this.tipo =  this.type.tipo_vehiculo[typeindex];
  }

  action(){
    this.update(this.form);
  }

  update(form:any){
    if(!form.invalid){
      const { value:data } = form;
      data.id = this.data.id;
      if (data["imei"] != null && (data["imei"].length <= 0 || data["imei"] === "N/A")) data["imei"] = null
      if (data["patente"] != null && (data["patente"].length <= 0 || data["patente"] == "N/A")) data["patente"] = null
      if (data["marca"] != null && (data["marca"].length <= 0 || data["marca"] == "N/A")) data["marca"] = null
      if (data["modelo"] != null && (data["modelo"].length <= 0 || data["modelo"] == "N/A")) data["modelo"] = null
      if (data["linea"] != null && (data["linea"].length <= 0 || data["linea"] == "N/A")) data["linea"] = null
      if (data["kilometraje"] != null && (data["kilometraje"].length < 0 || data["kilometraje"] == "N/A")) data["kilometraje"] = null
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
