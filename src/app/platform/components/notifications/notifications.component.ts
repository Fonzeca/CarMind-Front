import { Component, Input, OnInit } from '@angular/core';
import { notifications } from '../../interfaces/notifications';
import { BaseComponent } from '../../shared/components/base.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent extends BaseComponent implements OnInit {

  @Input() data:any;
  notifications:notifications[] = [];

  constructor() {
    super();
   }

  ngOnInit(): void {
    this.addSafeSubscription(
      this.data.notifications.subscribe((notifications:notifications[])=>{
        this.notifications = notifications.reverse();
      })
    )
  }

}
