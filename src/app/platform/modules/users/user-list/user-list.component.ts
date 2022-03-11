import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/platform/components/modal/modal.component';
import { user } from 'src/app/platform/interfaces/user';
import { UsersService } from 'src/app/platform/services/users.service';
import { UserFormComponent } from '../shared/user-form/user-form.component';
import Swal from 'sweetalert2'
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent implements OnInit {

  filterInput: string = '';

  columns = 5;

  default:any = {
    "id": "empty",
    "nombre": "-",
    "dni": "-",
    "administrador": "-"
  };

  constructor(public _users: UsersService, public dialog: MatDialog) {
    super();
   }

  ngOnInit(): void {
    this.addSafeSubscription(
      this._users.getAll().subscribe()
    )
  }

  filterCondition(item:any, term:string){
    const cond = (
      item.nombre.toUpperCase().indexOf(term.toUpperCase()) > -1
    )
    return cond;
  }


  openCreateModal() {
    this.dialog.open(ModalComponent, {
      width: '635px;',
      height: 'auto',
      panelClass: ['md:w-3/5', 'w-full'],
      data: {
        viewComponent: {
          component: UserFormComponent,
          data: {  },
        },
        title: 'Nueva persona',
      },
    });
  }

  openEditModal(user:user) {
    this.dialog.open(ModalComponent, {
      width: '635px;',
      height: 'auto',
      panelClass: ['md:w-3/5', 'w-full'],
      data: {
        viewComponent: {
          component: UserFormComponent,
          data: {
            ...user
           },
        },
        title: 'Editar persona',
      },
    });
  }

  deleteUser(user:user) {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar a ${user.nombre}?`,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: "btn btn-success m-btn-succes",
        cancelButton: 'order-1 right-gap',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this._users.deleteById(user.id).subscribe();
      }
    })
  }


}
