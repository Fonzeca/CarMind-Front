import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { ModalComponent } from '../../components/modal/modal.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { notifications } from '../../interfaces/notifications';
import { FormVehicleComponent } from '../../modules/vehicles/shared/form-vehicle/form-vehicle.component';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';
import { BaseComponent } from '../../shared/components/base.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent extends BaseComponent implements OnInit {

  constructor(private auth: AuthService,public _notifications:NotificationsService, public dialog:MatDialog) {
    super();
  }

  notifications:notifications[] = [];

  full_name! :string

  ngOnInit(): void {
    this.getNotifications();
    this.addSafeSubscription(
      this.auth.getLoggedUser().subscribe((data) => {
        this.full_name = `${data.nombre} ${data.apellido}`;
      }),
      interval(120000).subscribe(()=>{
        this.getNotifications();
      })
    );
  }

  getNotifications(){
    this.addSafeSubscription(
      this._notifications.getNotifications().subscribe(
        notifications=>{
          this.notifications = notifications;
        }
      )
    )
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

  verNotificaciones() {
    this._notifications.getNotifications().subscribe();
    this.dialog.open(ModalComponent, {
      width: '635px;',
      height: 'auto',
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {
        viewComponent: {
          component: NotificationsComponent,
          data: {
            notifications: this._notifications.getNotifications$
          },
        },
        title: 'Notificaciones',
      },
    })
  }

}
