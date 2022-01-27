import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/Interface/login';
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
  this.loginService.login(form).subscribe(

    data =>{
        /* console.log("DATA"+ JSON.stringify(data)); */
    }

  )
}

}
