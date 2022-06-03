import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { dyComponent } from 'src/app/platform/components/modal/modal.component';
import { AppService } from 'src/app/platform/services/core/app.service';
import { FormsService } from 'src/app/platform/services/forms.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';

@Component({
  selector: 'app-form-assignment',
  templateUrl: './form-assignment.component.html',
  styleUrls: ['./form-assignment.component.css']
})
export class FormAssignmentComponent implements dyComponent {

  @Input() data:any;

  form!:FormGroup;

  model: NgbDateStruct | undefined;
  constructor(
    private _app:AppService,
    private _vehicle:VehiclesService, public _forms:FormsService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "id_evaluacion" : [undefined,Validators.required],
      "intervalo_dias" : [1,Validators.required],
      "fecha_inicio" : [null,Validators.required],
    });
    this._forms.getAllForms().subscribe();
  }


  action(){
    if(this.data.id){
      let form = {...this.form.value};
      form.fecha_inicio = moment(form.fecha_inicio).format('DD/MM/YYYY')
      this._vehicle.documentAssignment(this.data.id,form).subscribe(res=> {
        this._app.sw.alertSuccess("Formulario asignado");
        this.data.close();
      })
    }
    // if(this.data?.id){
    //   this.update(this.form);
    // }else{
    //   this.create(this.form);
    // }
  }

  getControl(control:string) : AbstractControl {
    return this.form.controls[control];
  }

  validControl(controlName:string, submited:boolean): boolean{
    return this.getControl(controlName)?.invalid && (this.getControl(controlName).touched || submited)
  }

}
