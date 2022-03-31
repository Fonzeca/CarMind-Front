import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/platform/services/core/app.service';
import { TypeService } from 'src/app/platform/services/type.service';
import { UsersService } from 'src/app/platform/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() data:any;

  form!: FormGroup;

  constructor(
    private dialogRef: MatDialog,
    private formBuilder:FormBuilder,
    public _user:UsersService,
    public _app:AppService,
    public type:TypeService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        "nombre" : [ this.data?.nombre ? this.data.nombre : '' ,Validators.required],
        "apellido" : [this.data?.apellido ? this.data.apellido : '',Validators.required],
        "username" : [this.data?.username ? this.data.username : '',Validators.required],
        "DNI" : [this.data?.dni ? this.data.dni : '', this.data?.id ? null : Validators.required],
        "administrador" : [this.data?.administrador ? true : false],
    });
    if(!this.data?.id){
      this.form.addControl('password', new FormControl('', Validators.required));
    }
  }

  action(){
    console.log(this.form);
    if(this.data?.id){
      this.update(this.form);
    }else{
      this.create(this.form);
    }
  }

  create(form:any){
    if(!form.invalid){
      const { value:data } = form;
      this._user.create(data).subscribe(
        res=>{
          this.close()
          this._app.sw.alertSuccess("Persona guardada");
        }
      )
    }
  }

  update(form:any){
    if(!form.invalid){
      const { value:data } = form;
      data.id = this.data.id;
      this._user.update(data).subscribe(
        res=>{
          this.close()
          this._app.sw.alertSuccess("Persona actualizada");
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
