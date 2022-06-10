import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { catchError, map, of } from 'rxjs';
import { AppRoutes } from 'src/app/routes';
import { FormCreate } from '../../interfaces/form';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/core/app.service';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  password = new FormControl('', [Validators.required, Validators.maxLength(50)])
  verifyPassword = new FormControl('', [Validators.required, Validators.maxLength(50)])
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

  changePass(form:any): any {
    const params = new HttpParams()
    .append('password', form.password)
    .append('verifyPassword', form.verifyPassword)

    if(this.arePasswordsEqual()){
      if(this.arePasswordsShort()){
        this._app.sw.alertError('La contraseña debe tener al menos 6 caracteres');
      }else{
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
      }
    }else{
      this._app.sw.alertError('Las contraseñas no coinciden');
    }

  }

  handlerError(error: any) {

    console.log(error);
    return of(error);
  }

  showPassword=false;
  showPassword2=false;
  showPasswordEvent(){
    this.showPassword = !this.showPassword;

  }
  showPassword2Event(){
    this.showPassword2 = !this.showPassword2;
  }

  arePasswordsEqual() {
    return this.password.value === this.verifyPassword.value;
  }

  arePasswordsShort() {
    return this.password.value.length < 6 || this.verifyPassword.value.length < 6;
  }
}
