import { LoginService } from './../../service/login.service';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/Interface/login';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {



  constructor(public formBuilder: FormBuilder, private loginService: LoginService) { }

  myForm = this.formBuilder.group({
    usuario : '',
    contraseña : ''
  })

  ngOnInit(): void {
  }

verLogin(form: Login){
 
   this.loginService.login(form).pipe(


     catchError(this.handlerError)
   )


}

handlerError(error: any){
  /* if(error){
    this.renderer2.setStyle(this.elementRef.nativeElement, 'border', 'red')
  } */
  console.log(error)
  return of(error)
}

}
