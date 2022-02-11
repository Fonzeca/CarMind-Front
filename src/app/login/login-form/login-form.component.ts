import {
  Component, OnInit
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Login } from 'src/app/Interface/login';
import { AuthenticationService } from 'src/app/service/authentication.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  
  email!: string

  usuario = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('\b[\w.-]+@[\w.-]+.\w{2,4}\b')]);
  contraseña = new FormControl('', [Validators.required, Validators.maxLength(50)])
  resultado!: string;

  constructor(
    public formBuilder: FormBuilder,
    public auth: AuthenticationService,
    private router: Router
  ) {
    //Si esta logeado lo manda al home directo.
    if (this.auth.isLogged()) {
      this.router.navigate(['/home']);
    }
  }

  myForm = this.formBuilder.group({
    usuario: this.usuario,
    contraseña: this.contraseña
  });

  ngOnInit(): void {

  }

  verLogin(form: Login): any {
    this.auth.login(form).pipe(
      map((data) => {
        this.router.navigate(['/home']);
      }),
      catchError(this.handlerError)
    ).subscribe();
  }

  handlerError(error: any) {

    console.log(error);
    return of(error);
  }

  errorUsuario() {
    if ((this.usuario.dirty || this.usuario.touched) && this.usuario.errors) {
      this.resultado = "No ha ingresado su email";

    }
    if (this.usuario.hasError('pattern') && this.usuario.errors) {
      this.resultado = "El campo esta incorrecto";

    }




    else if (this.usuario.hasError('maxlength') && this.usuario.errors) {
      this.resultado = "El maximo de letras es 30";

    }

    return this.resultado;
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

}

//Que las validaciones aparescan cuando haga click en el boton de inicio de sesion
