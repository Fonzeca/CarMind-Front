import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AppRoutes } from 'src/app/routes';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/core/app.service';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  password = new FormControl('', [Validators.maxLength(50), Validators.minLength(6)])
  verifyPassword = new FormControl('', [Validators.maxLength(50), Validators.minLength(6)])
  result!: string;

  constructor(
    public formBuilder: FormBuilder,
    public _auth: AuthService,
    private router: Router,
    public _form: FormsService,
    public _app: AppService,
  ) { }

  myForm = this.formBuilder.group({
    password: this.password,
    verifyPassword: this.verifyPassword
  });

  ngOnInit(): void {
    this._app.sw.alertWarning('').then(() => {
    });
  }

  ngAfterViewInit() {
    this.password.addValidators(Validators.required);
    this.verifyPassword.addValidators(Validators.required);
  }

  changePass(form:any): any {
    const params = new HttpParams()
    .append('password', form.password)
    .append('verifyPassword', form.verifyPassword)

    if(this.password.errors === null && this.verifyPassword.errors === null){
      if(this.arePasswordsEqual()){
          this._auth.changePasswordAtFirstLogin(params).subscribe(
            success=>{
                this._app.sw.alertSuccess('Contraseña cambiada').then(() => {
                  this.router.navigateByUrl(AppRoutes.platform.vehicles.route);
                });
            },
           error=>{
              console.log(error);
            },
          )
      }else{
        this._app.sw.alertError('Las contraseñas no coinciden');
      }
    }

  }

  handlerError(error: any) {
    console.log(error);
    return of(error);
  }

  showPassword=false;
  showPassword2=false;

  passError() {

    if (this.password.hasError('required')) {
      return "La contraseña no puede estar vacía";
    }

    if (this.password.hasError('maxlength') && this.password.errors) {
      return "Contraseña demasiado larga";
    }

    if (this.password.hasError('minlength') && this.password.errors) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    return;
  }

  verifyPassError() {

    if (this.verifyPassword.hasError('required')) {
      return "La contraseña no puede estar vacía";
    }

    if (this.verifyPassword.hasError('maxlength') && this.password.errors) {
      return "Contraseña demasiado larga";
    }

    if (this.verifyPassword.hasError('minlength') && this.password.errors) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    return;
  }


  showPasswordEvent(){
    this.showPassword = !this.showPassword;

  }
  showPassword2Event(){
    this.showPassword2 = !this.showPassword2;
  }

  arePasswordsEqual() {
    return this.password.value === this.verifyPassword.value;
  }

}
