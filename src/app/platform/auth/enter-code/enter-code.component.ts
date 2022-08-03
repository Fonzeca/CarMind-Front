import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AppRoutes } from 'src/app/routes';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-enter-code',
  templateUrl: './enter-code.component.html',
  styleUrls: ['./enter-code.component.scss']
})
export class EnterCodeComponent implements OnInit {

  code = new FormControl('', [Validators.maxLength(4), Validators.minLength(4)]);
  email = null;

  myForm = this.formBuilder.group({
    code: this.code
  });

  constructor(private _router: Router,  public _auth: AuthService, public formBuilder: FormBuilder,) {
    this.email = this._router.getCurrentNavigation()?.extras.state?.['email'];
    if (this.email == null) _router.navigateByUrl(AppRoutes.platform.vehicles.route);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.code.addValidators(Validators.required);
  }

  sendCodeToEmail(form:any): any {
    if(this.code.errors === null){
      const data ={
        "email": this.email,
        "token": form.code
      }
      this._auth.sendCodeToChangePass(data).pipe(map((_:any) => {
        this._router.navigateByUrl(AppRoutes.auth.change_password,{state: {'data':data}});
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

  codeError() {

    if (this.code.hasError('required') || this.code.hasError('minlength') || this.code.hasError('maxlength')) {
      return "El código debe ser de 4 números";
    }

    return;
  }

}
