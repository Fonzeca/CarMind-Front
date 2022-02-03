import {
  Component, OnInit
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { Login } from 'src/app/Interface/login';
import { LoginService } from './../../service/login.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public loginService: LoginService,

  ) {
    this.loginService.verSiEstaLogeado();
  }

  email!: string


  myForm = this.formBuilder.group({
    usuario: this.loginService.usuario,
    contraseña: this.loginService.contraseña
  });

  ngOnInit(): void {
    
  }

  verLogin(form: Login): any {
    this.loginService.login(form).subscribe(catchError(this.handlerError));
  }

  handlerError(error: any) {

    console.log(error);
    return of(error);
  }

  submit(){

  }
}

//Que las validaciones aparescan cuando haga click en el boton de inicio de sesion
