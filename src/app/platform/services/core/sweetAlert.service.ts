import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'


@Injectable({
  providedIn:'root'
})
export class SweetAlertService {

  constructor() { }

  alertSuccess(message:any)
  {
    return Swal.fire({
      title: 'Mensaje',
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }

  alertError(message:string)
  {
    return Swal.fire({
      title: 'Mensaje',
      text: message,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }

  alertWarning(message:string)
  {
    return Swal.fire({
      title: 'Debe cambiar su contraseña',
      text: message,
      icon: 'warning',
      timer: 4000,
    });
  }
}
