import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';
import { AppRoutes } from 'src/app/routes';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/core/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  username = new FormControl('', [Validators.maxLength(30), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  password = new FormControl('', [Validators.maxLength(30), Validators.minLength(6)])

  constructor(
    public formBuilder: FormBuilder,
    public _auth: AuthService,
    private router: Router,
    public _app: AppService,
    ) {
  }

  myForm = this.formBuilder.group({
    username: this.username,
    password: this.password
  });

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.username.addValidators(Validators.required);
    this.password.addValidators(Validators.required);
  }

  login(form:any): any {
    const params = new HttpParams()
    .append('username', form.username)
    .append('password', form.password)

    if(this.username.errors === null && this.password.errors === null){
      this._auth.login(params).pipe(map((data:any) => {
        if(data.mustChangePassword){
          this._app.sw.alertWarning('').then(() => {
            this.router.navigateByUrl(AppRoutes.auth.change_password,{state: {token: data.token}});
          });
        }else{
          this.router.navigateByUrl(AppRoutes.platform.vehicles.route);
        }
      })).subscribe(
        error=>{
          console.log(error);
        },
      )
    }

  }

  handlerError(error: any) {

    console.log(error);
    return of(error);
  }

  userError() {

    if (this.username.hasError('required')) {
      return "El email no puede estar vacío";
    }

    if (this.username.hasError('pattern')) {
      return "Email ingresado inválido";
    }

    if (this.username.hasError('maxlength')) {
      return "Email demasiado largo";
    }

    return;
  }

  passError() {

    if (this.password.hasError('required')) {
      return "La contraseña no puede estar vacía";
    }

    if (this.password.hasError('maxlength')) {
      return "Contraseña demasiado larga";
    }

    if (this.password.hasError('minlength')) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    return;
  }

  showPassword=false;
  showPasswordEvent(){
    this.showPassword = !this.showPassword;
  }

  changePassword(){
    this.router.navigateByUrl(AppRoutes.auth.enter_email);
  }


}
