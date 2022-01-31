import { LoginService } from './../../service/login.service';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/Interface/login';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public loginService: LoginService,

  ) {}

  email!: string


  myForm = this.formBuilder.group({
    usuario: this.loginService.usuario,
    contraseña: this.loginService.contraseña
  });

  ngOnInit(): void {}

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
