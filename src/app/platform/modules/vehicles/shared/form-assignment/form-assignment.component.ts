import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { dyComponent } from 'src/app/platform/components/modal/modal.component';
import { NgbDateFRParserFormatter } from 'src/app/platform/date-parser.service';
import { AppService } from 'src/app/platform/services/core/app.service';
import { FormsService } from 'src/app/platform/services/forms.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';

@Component({
  selector: 'app-form-assignment',
  templateUrl: './form-assignment.component.html',
  styleUrls: ['./form-assignment.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class FormAssignmentComponent implements dyComponent {

  @Input() data:any;

  form!:FormGroup;

  fechaInicio: NgbDateStruct | undefined;
  constructor(
    private _app:AppService,
    private _vehicle:VehiclesService, public _forms:FormsService, private formBuilder:FormBuilder, private dateParser : NgbDateFRParserFormatter) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "id_evaluacion" : [undefined,Validators.required],
      "intervalo_dias" : [1,Validators.required],
      "fecha_inicio" : [NgbDate,Validators.required],
    });
    this._forms.getAllForms().subscribe();
  }


  action(){
    if(this.data.id){
      let form = {...this.form.value};
      form.fecha_inicio = this.dateParser.format(form.fecha_inicio)
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
