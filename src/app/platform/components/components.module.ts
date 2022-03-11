import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';



@NgModule({
  declarations: [ModalComponent, NotificationsComponent, NotificationItemComponent],
  exports: [ModalComponent, NotificationsComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  entryComponents:[ModalComponent]
})
export class ComponentsModule { }
