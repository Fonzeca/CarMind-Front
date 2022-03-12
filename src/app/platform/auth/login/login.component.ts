import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AppRoutes } from 'src/app/routes';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email!: string

  usuario = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('\b[\w.-]+@[\w.-]+.\w{2,4}\b')]);
  contraseña = new FormControl('', [Validators.required, Validators.maxLength(50)])
  resultado!: string;

  constructor(
    public formBuilder: FormBuilder,
    public _auth: AuthService,
    private router: Router
  ) { }

  myForm = this.formBuilder.group({
    username: this.usuario,
    password: this.contraseña
  });

  ngOnInit(): void {

  }

  login(form:any): any {
    const params = new HttpParams()
    .append('username', form.username)
    .append('password', form.password)

    this._auth.login(params).subscribe(
      success=>{
        this.router.navigateByUrl(AppRoutes.platform.vehicles.route);
      },
      error=>{
        console.log(error);
      },
    )
  }

  handlerError(error: any) {

    console.log(error);
    return of(error);
  }

  errorUsuario() {
    if ((this.usuario.dirty || this.usuario.touched) && this.usuario.errors) {
      return "No ha ingresado su email";

    }
    if (this.usuario.hasError('pattern') && this.usuario.errors) {
      return "El campo esta incorrecto";

    }else if (this.usuario.hasError('maxlength') && this.usuario.errors) {
      return "El maximo de letras es 30";
    }
    return;
  }

  errorContrasenia() {
    if ((this.contraseña.dirty || this.contraseña.touched) && this.contraseña.errors) {
      this.resultado = "No ha ingresa su contraseña";

    }

    else if (this.contraseña.hasError('maxlength') && this.contraseña.errors) {
      this.resultado = "El maximo de letras es 30";

    }

    return this.resultado;
  }

  showPassword=false;
  showPasswordEvent(){
    this.showPassword = !this.showPassword;
  }


}
