import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AppRoutes } from 'src/app/routes';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.scss']
})
export class EnterEmailComponent implements OnInit {

  username = new FormControl('', [Validators.maxLength(30), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);

  myForm = this.formBuilder.group({
    username: this.username
  });

  constructor(private _router: Router,  public _auth: AuthService, public formBuilder: FormBuilder,) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.username.addValidators(Validators.required);
  }

  sendCodeToEmail(form:any): any {
    const username = form.username;
    const params = new HttpParams()
    .append('email', username)

    if(this.username.errors === null){
      this._auth.sendEmailToChangePass(params).pipe(map((_:any) => {
        this._router.navigateByUrl(AppRoutes.auth.enter_code,{state: {'email':username}});
      })).subscribe(
        error=>{
          console.log(error);
        },
      )
    }

  }


  login(){
    this._router.navigateByUrl(AppRoutes.auth.login);
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

}
